import React from "react";
import { Root, createRoot } from "react-dom/client";
import { H5PIntegrationObject } from "h5p-types";

import QuizDoc from "./QuizDoc";
import { Main } from "./Main";
import {
  IContext,
  IMe,
  IMetadata,
  IOtherUser,
  IParams,
  IQuizPresence,
} from "./types";
import ShareDBActions from "./ShareDBActions";
import { Grommet } from "grommet";
import { triggerActions } from "./triggers";
import { L10nContext } from "use-h5p";

declare const H5PIntegration: H5PIntegrationObject;

/**
 * The H5P content type class.
 */
export default class MultiuserQuiz {
  /**
   * @param params Parameters passed by the editor.
   * @param contentId Content's id.
   * @param extras Saved state, metadata, etc.
   */
  constructor(
    private params: IParams,
    private contentId: string,
    private extras: {
      metadata?: IMetadata;
      standalone?: boolean;
    } = {},
    private triggerResize: () => void
  ) {
    this.metadata = extras.metadata ?? {
      defaultLanguage: "en",
      title: "Unknown title",
      license: "U",
    };
    // Create render root
    this.domRoot = document.createElement("div");
    this.root = createRoot(this.domRoot);

    // Initialize connection to ShareDB server
    this.connector = new H5P.SharedStateClient<QuizDoc, IQuizPresence>(
      QuizDoc,
      contentId,
      {
        onRefresh: this.onRefreshData,
        onRefreshPresences: this.onRefreshPresences,
        onConnected: this.onConnected,
        onDeleted: this.onDeleted,
        onError: this.onError,
      },
      { enablePresence: true }
    );
    this.actions = new ShareDBActions(this.connector);
  }

  private metadata: IMetadata;
  private domRoot: HTMLElement;
  private root: Root;
  private connector: H5P.SharedStateClient<QuizDoc, IQuizPresence>;
  private data?: QuizDoc;
  private deleted = false;
  private error?: string = undefined;
  private userInformation: IMe = {
    userId: "",
    level: "anonymous",
  };
  private context: IContext;
  private actions: ShareDBActions;
  private otherUsers: IOtherUser[] = [];

  /**
   * Attach content type to DOM.
   * @param wrapper the content's container.
   */
  attach = (wrapper: JQuery) => {
    wrapper?.get(0)?.classList.add("multiuser-quiz");
    wrapper?.get(0)?.appendChild(this.domRoot);

    // We render an initial state of the content type here. It will be updated
    // later when the data from the server has arrived.
    this.renderRoot();
    this.triggerResize();
  };

  onConnected = async (state: QuizDoc): Promise<void> => {
    console.log("Connection established");
    if (!this.connector.userInformation) {
      throw new Error("Didn't get required user information.");
    }
    this.userInformation = this.connector.userInformation;
    this.context = {
      userId: this.userInformation.userId,
      isTeacher: this.userInformation.level === "privileged",
      displayName: H5PIntegration.user?.name,
    };

    if (!this.context.isTeacher) {
      // We need to write the current user name into the shared state so that it
      // is known to other users (when displaying the scores).
      this.actions.register(this.context, state, this.params);
    }

    await this.connector.submitPresence({
      userId: this.userInformation.userId,
      name: H5PIntegration.user?.name,
      level: this.userInformation.level,
    });
  };

  onDeleted = async (): Promise<void> => {
    console.log("Document deleted");
    this.data = undefined;
    this.deleted = true;
    this.renderRoot();
    this.triggerResize();
  };

  onError = async (error: string): Promise<void> => {
    console.log("Error");
    this.data = undefined;
    this.error = error;
    this.renderRoot();
    this.triggerResize();
  };

  /**
   * This method is called when the ShareDB server has updated the shared state.
   * React is clever enough to note replace the whole DOM when doing this. It
   * only rerenders the changed parts.
   */
  onRefreshData = async (data: QuizDoc): Promise<void> => {
    console.log("Refreshing data", data);
    this.data = data;
    this.renderRoot();
    if (this.data) {
      triggerActions(
        this.context,
        this.params,
        this.data,
        this.userInformation,
        this.otherUsers,
        this.actions
      );
    }
    this.triggerResize();
  };

  onRefreshPresences = async (presences: {
    [id: string]: IQuizPresence;
  }): Promise<void> => {
    console.log("Refreshing presences", presences);
    this.otherUsers = Object.keys(presences).map((k) => ({
      ...presences[k],
      presenceId: k,
    }));
    this.renderRoot();
    if (this.data) {
      triggerActions(
        this.context,
        this.params,
        this.data,
        this.userInformation,
        this.otherUsers,
        this.actions
      );
    }
    this.triggerResize();
  };

  private renderRoot = () => {
    this.root.render(
      <Grommet plain>
        <L10nContext.Provider value={this.params.l10n}>
          <Main
            context={{
              userId: this.userInformation.userId,
              isTeacher: this.userInformation.level === "privileged",
              displayName: H5PIntegration.user.name,
            }}
            state={this.data}
            deleted={this.deleted}
            params={this.params}
            error={this.error}
            metadata={this.metadata}
            users={this.otherUsers}
            actions={this.actions}
          />
        </L10nContext.Provider>
      </Grommet>
    );
  };
}
