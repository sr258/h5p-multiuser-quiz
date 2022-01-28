import ShareDBDocument from "./ShareDBDocument";

/**
 * The sample document that represents the shared state.
 */
export default class QuizDoc extends ShareDBDocument {
  constructor() {
    super();
  }
  seed(): void {
    this.votesDown = [];
    this.votesUp = [];
  }

  /**
   * A list of user ids of users who votes up.
   */
  public votesUp: string[] = [];

  /**
   * A list of user ids of users who votes down.
   */
  public votesDown: string[] = [];
}
