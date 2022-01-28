import { Phases } from "./types";
import ShareDBDocument from "./ShareDBDocument";

/**
 * The sample document that represents the shared state.
 */
export default class QuizDoc extends ShareDBDocument {
  constructor() {
    super();
  }
  seed(): void {
    this.answers = [];
    this.scores = {};
    this.phase = "preparing";
    this.currentQuestionNumber = undefined;
    this.currentQuestionNumber = undefined;
  }

  public answers: {
    [userId: string]: number;
  }[];

  public scores: {
    [userId: string]: number;
  };

  public currentQuestionNumber?: number;
  public currentQuestionStart?: number;
  public phase: Phases;
}
