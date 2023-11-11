import { IState, Phases } from "./types";

/**
 * The document that represents the quiz shared state.
 */
export default class QuizDoc implements IState {
  seed(): void {
    this.answers = [];
    this.scores = {};
    this.users = {};
    this.phase = "preparing";
    this.currentQuestionNumber = 0;
    this.currentQuestionStart = 0;
    this.currentQuestionOrder = [];
  }

  /**
   * Saves the answers users gave for questions
   */
  public answers: {
    [userId: string]: number;
  }[];

  /**
   * Saves the scores users have received for theirs answers. (Only written by
   * the teacher)
   */
  public scores: {
    [userId: string]: number;
  };

  /**
   * A map of userIds to user display names. (Needed for the score screen)
   */
  public users: {
    [userId: string]: string;
  };

  /**
   * The index of the currently displayed question (zero-based)
   */
  public currentQuestionNumber: number;
  /**
   * The start time of the currently displayed question in milliseconds elapsed
   * since January 1, 1970 0:0:0. (as returned by Date.now())
   */
  public currentQuestionStart: number;
  /**
   * A list of the indexes that represents the order that the display order of
   * the options for the current question. This must be the same for every
   * client so that the buttons align correctly with the teacher screen Example:
   * [1, 3, 4, 0] means that the text with index 1 is displayed as the first
   * option, index 3 as the second, etc.
   * It is created by the teacher client when moving to a new phase.
   */
  public currentQuestionOrder: number[];

  /**
   * The current phase all players and the teacher(s) are in.
   */
  public phase: Phases;
}
