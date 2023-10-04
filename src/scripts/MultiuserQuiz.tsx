import React from "react";
import * as ReactDOM from "react-dom";
import { H5PIntegrationObject } from "h5p-types";

import QuizDoc from "./QuizDoc";
import { Main } from "./components/Main";
import { IActions, IContext, IMetadata, IParams } from "./types";
import ShareDBActions from "./ShareDBActions";

declare var H5PIntegration: H5PIntegrationObject;

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

    // Initialize connection to ShareDB server
    this.connector = new H5P.SharedStateClient<QuizDoc>(QuizDoc, contentId, {
      onRefresh: this.onRefreshData,
      onConnected: this.onConnected,
      onDeleted: this.onDeleted,
      onError: this.onError,
    });
    this.actions = new ShareDBActions(this.connector);
  }

  private metadata: IMetadata;
  private root: HTMLElement;
  private connector: H5P.SharedStateClient<QuizDoc>;
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
