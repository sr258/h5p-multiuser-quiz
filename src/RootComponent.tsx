/**
 * This component is the central component coordinating all others:
 * - It creates the React root
 * - It manages the connection to the shared state server
 * - It manages the global state
 * - It triggers React tree refreshes on state updates
 * - It manages presences
 * - It manages triggers
 */

import React from "react";
import { Root, createRoot } from "react-dom/client";
import { H5PIntegrationObject } from "h5p-types";
import { L10nContext } from "use-h5p";
import { Grommet } from "grommet";

import QuizDoc from "./QuizDoc";
import { Screens } from "./Screens";
import {
  IContext,
  IMetadata,
  IOtherUser,
  IParams,
  IQuizPresence,
} from "./types";
import ShareDBActions from "./ShareDBActions";
import { triggerActions } from "./triggers";
import { grommetTheme } from "./theme";

declare const H5PIntegration: H5PIntegrationObject;

/**
 * The H5P content type class.
 */
export default class RootComponent {
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
    this.reactRoot = createRoot(this.domRoot);

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

  /**
   * H5P metadata.
   */
  private metadata: IMetadata;
  /**
   * The DOM element which contains the root React element
   */
  private domRoot: HTMLElement;
  /**
   * The root React element.
   */
  private reactRoot: Root;
  /**
   * The connector object to the shared state server.
   */
  private connector: H5P.SharedStateClient<QuizDoc, IQuizPresence>;
  /**
   * The global state shared among all users.
   */
  private state?: QuizDoc;
  /**
   * If the content was deleted or updated on the server, we need to block all
   * user interactions and the user must fully reload the page. This property is
   * used to notify the user of this.
   */
  private deleted = false;
  /**
   * An error message
   */
  private error?: string = undefined;
  /**
   * Information about the current user
   */
  private context: IContext = {
    displayName: "",
    isTeacher: false,
    userId: "",
  };
  /**
   * Actions are performed on the global state. The object here allows access to
   * these actions.
   */
  private actions: ShareDBActions;
  /**
   * The list of other uses currently online in the content. Doesn't include the
   * current user her/himself.
   */
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
    this.context = {
      userId: this.connector.userInformation.userId,
      isTeacher: this.connector.userInformation.level === "privileged",
      displayName: H5PIntegration.user?.name,
    };

    if (!this.context.isTeacher) {
      // We need to write the current user name into the shared state so that it
      // is known to other users (when displaying the scores).
      this.actions.register(this.context, state, this.params);
    }

    await this.connector.submitPresence({
      userId: this.connector.userInformation.userId,
      name: H5PIntegration.user?.name,
      level: this.connector.userInformation.level,
    });
  };

  onDeleted = async (): Promise<void> => {
    console.log("Document deleted");
    this.state = undefined;
    this.deleted = true;
    this.renderRoot();
    this.triggerResize();
  };

  onError = async (error: string): Promise<void> => {
    console.log("Error");
    this.state = undefined;
    this.error = error;
    this.renderRoot();
    this.triggerResize();
  };

  /**
   * This method is called when the ShareDB server has updated the shared state.
   * React is clever enough to not replace the whole DOM when doing this. It
   * only rerenders the changed parts.
   */
  onRefreshData = async (data: QuizDoc): Promise<void> => {
    console.log("Refreshing data", data);
    this.state = data;
    this.renderRoot();
    if (this.state) {
      triggerActions(
        this.context,
        this.params,
        this.state,
        this.otherUsers,
        this.actions
      );
    }
    this.triggerResize();
  };

  /**
   * This method is called when the ShareDB server has updated the presence
   * list. React is clever enough to not replace the whole DOM when doing this.
   * It only rerenders the changed parts.
   */
  onRefreshPresences = async (presences: {
    [id: string]: IQuizPresence;
  }): Promise<void> => {
    console.log("Refreshing presences", presences);
    this.otherUsers = Object.keys(presences).map((k) => ({
      ...presences[k],
      presenceId: k,
    }));
    this.renderRoot();
    if (this.state) {
      triggerActions(
        this.context,
        this.params,
        this.state,
        this.otherUsers,
        this.actions
      );
    }
    this.triggerResize();
  };

  private renderRoot = () => {
    this.reactRoot.render(
      <Grommet theme={grommetTheme}>
        <L10nContext.Provider value={this.params.l10n}>
          <Screens
            context={this.context}
            state={this.state}
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
