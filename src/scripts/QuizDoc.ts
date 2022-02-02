import { IState, Phases } from "./types";
import ShareDBDocument from "./ShareDBDocument";

/**
 * The sample document that represents the shared state.
 */
export default class QuizDoc extends ShareDBDocument implements IState {
  constructor() {
    super();
  }
  seed(): void {
    this.answers = [];
    this.scores = {};
    this.phase = "preparing";
    this.currentQuestionNumber = 0;
    this.currentQuestionStart = 0;
    this.currentQuestionOrder = [];
  }

  public answers: {
    [userId: string]: number;
  }[];

  public scores: {
    [userId: string]: number;
  };

  public users: {
    [userId: string]: string;
  };

  public currentQuestionNumber: number;
  public currentQuestionStart: number;
  public currentQuestionOrder: number[];

  public phase: Phases;
}
