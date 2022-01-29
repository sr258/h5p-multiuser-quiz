import React from "react";
import * as ReactDOM from "react-dom";

import QuizDoc from "./QuizDoc";
import { Main } from "./components/Main";
import ShareDBConnector from "./ShareDBConnector";
import { IParams } from "./types";

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
    extras: any = {}
  ) {
    // Create render root
    this.root = document.createElement("div");

    // The shared-state server configuration is provided by the H5P plugin of
    // the host system. (Must be configured there)
    const serverConfig: { serverUrl: string; auth: string } =
      H5P.getLibraryConfig("H5P.ShareDBTest");
    fetch(serverConfig.auth + "/" + contentId, {
      mode: "cors",
      credentials: "include",
    }).then(async (auth) => {
      this.userInformation = await auth.json();
    });

    // Initialize connection to ShareDB server
    this.connector = new ShareDBConnector<QuizDoc>(
      serverConfig.serverUrl,
      contentId,
      this.refreshData,
      QuizDoc
    );
  }

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
        }}
        doc={this.data}
        params={this.params}
      />,
      this.root
    );
  };

  /**
   * This method is called when the ShareDB server has updated the shared state.
   * React is clever enough to note replace the whole DOM when doing this. It
   * only rerenders the changed parts.
   */
  refreshData = async (data: QuizDoc): Promise<void> => {
    console.log("Refreshing data", data);
    this.data = data;
    ReactDOM.render(
      <Main
        context={{
          userId: this.userInformation.userId,
          isTeacher: this.userInformation.level === "privileged",
        }}
        doc={this.data}
        params={this.params}
      />,
      this.root
    );
  };

  // /**
  //  * Submit operation when user clicked on "vote up" button.
  //  */
  // public voteUp = (): void => {
  //   console.log("voting up");
  //   this.connector.submitOp([
  //     { p: ["votesUp", 0], li: this.userInformation.userId },
  //   ]);
  // };

  // /**
  //  * Submit operation when user clicked on "vote down" button.
  //  */
  // public voteDown = (): void => {
  //   console.log("voting down");
  //   this.connector.submitOp([
  //     { p: ["votesDown", 0], li: this.userInformation.userId },
  //   ]);
  // };

  // /**
  //  * Submit operation when user clicked on "clear button"
  //  */
  // public clear = (): void => {
  //   if (this.data) {
  //     console.log("clearing");
  //     // Clearing works by replacing the arrays with empty arrays
  //     this.connector.submitOp([
  //       { p: ["votesDown"], od: this.data.votesDown, oi: [] },
  //       { p: ["votesUp"], od: this.data.votesUp, oi: [] },
  //     ]);
  //   }
  // };
}
