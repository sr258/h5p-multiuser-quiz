import React from "react";
import * as ReactDOM from "react-dom";

import QuizDoc from "./QuizDoc";
import { Main } from "./components/Main";
import ShareDBConnector from "./ShareDBConnector";
import { IActions, IContext, IMetadata, IParams } from "./types";
import ShareDBActions from "./ShareDBActions";

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
    this.root = document.createElement("div");

    // The shared-state server configuration is provided by the H5P plugin of
    // the host system. (Must be configured there)
    const serverConfig: { serverUrl: string; auth: string } =
      H5P.getLibraryConfig("H5P.ShareDBTest");

    // Get authentication data
    fetch(serverConfig.auth + "/" + contentId, {
      mode: "cors",
      credentials: "include",
    }).then(async (auth) => {
      this.userInformation = await auth.json();
      this.context = {
        userId: this.userInformation.userId,
        isTeacher: this.userInformation.level === "privileged",
        displayName: H5PIntegration.user?.name,
      };
      // Initialize connection to ShareDB server
      this.connector = new ShareDBConnector<QuizDoc>(
        serverConfig.serverUrl,
        contentId,
        this.onRefreshData,
        this.onConnected,
        this.onDeleted,
        this.onError,
        QuizDoc
      );
      this.actions = new ShareDBActions(this.connector);
    });
  }

  private metadata: IMetadata;
  private root: HTMLElement;
  private connector: ShareDBConnector<QuizDoc>;
  private data?: QuizDoc;
  private userInformation: {
    userId: string;
    level: "anonymous" | "user" | "privileged";
  } = {
    userId: "",
    level: "anonymous",
  };
  private context: IContext;
  private actions: IActions;

  /**
   * Attach content type to DOM.
   * @param wrapper the content's container.
   */
  attach = (wrapper: JQuery) => {
    wrapper?.get(0)?.classList.add("multiuser-quiz");
    wrapper?.get(0)?.appendChild(this.root);

    // We render an initial state of the content type here. It will be updated
    // later when the data from the server has arrived.
    ReactDOM.render(
      <Main
        context={{
          userId: this.userInformation.userId,
          isTeacher: this.userInformation.level === "privileged",
          displayName: H5PIntegration.user.name,
        }}
        state={this.data}
        params={this.params}
        metadata={this.metadata}
      />,
      this.root
    );
    this.triggerResize();
  };

  onConnected = async (state: QuizDoc): Promise<void> => {
    console.log("Connection established");
    if (!this.context.isTeacher) {
      // We need to write the current user name into the shared state so that it
      // is known to other users (when displaying the scores).
      this.actions.register(this.context, state, this.params);
    }
  };

  onDeleted = async (): Promise<void> => {
    console.log("Document deleted");
    ReactDOM.render(
      <Main
        context={{
          userId: this.userInformation.userId,
          isTeacher: this.userInformation.level === "privileged",
          displayName: H5PIntegration.user.name,
        }}
        state={undefined}
        params={this.params}
        deleted={true}
        metadata={this.metadata}
      />,
      this.root
    );
    this.triggerResize();
  };

  onError = async (error: string): Promise<void> => {
    console.log("Error");
    ReactDOM.render(
      <Main
        context={{
          userId: this.userInformation.userId,
          isTeacher: this.userInformation.level === "privileged",
          displayName: H5PIntegration.user.name,
        }}
        state={undefined}
        params={this.params}
        error={error}
        metadata={this.metadata}
      />,
      this.root
    );
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
    ReactDOM.render(
      <Main
        context={this.context}
        state={this.data}
        params={this.params}
        actions={this.actions}
        metadata={this.metadata}
      />,
      this.root
    );
    this.triggerResize();
  };
}
