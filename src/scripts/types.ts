export type Phases = "preparing" | "question" | "review" | "scores";

export interface IState {
  answers: {
    [userId: string]: number;
  }[];

  scores: {
    [userId: string]: number;
  };

  users: {
    [userId: string]: string;
  };

  currentQuestionNumber: number;
  currentQuestionStart: number;
  currentQuestionOrder: number[];

  phase: Phases;
}

export interface IParams {
  questions: {
    params: {
      choices: {
        subContentId: string;
        question: string;
        answers: string[];
      }[];
      overallFeedback: { from: number; to: number; feedback: string }[];
      behaviour: {
        autoContinue: boolean;
        timeoutCorrect: number;
        timeoutWrong: number;
        soundEffectsEnabled: boolean;
        enableRetry: boolean;
        enableSolutionsButton: boolean;
        passPercentage: number;
      };
      l10n: {
        nextButtonLabel: string;
        showSolutionButtonLabel: string;
        retryButtonLabel: string;
        solutionViewTitle: string;
        correctText: string;
        incorrectText: string;
        muteButtonLabel: string;
        closeButtonLabel: string;
        slideOfTotal: string;
        scoreBarLabel: string;
        solutionListQuestionNumber: string;
        a11yShowSolution: string;
        a11yRetry: string;
      };
    };
    library: string;
    subContentId: string;
    metadata: {
      contentType: string;
      license: string;
      title: string;
      authors: string[];
      changes: string[];
      extraTitle: string;
    };
  };
}

export interface IContext {
  userId: string;
  isTeacher: boolean;
}

/**
 * User actions
 */
export interface IActions {
  /**
   * Called by a teacher when the game first starts or when clicking no 'play
   * again' (reset the game then).
   */
  start(context: IContext, state: IState, params: IParams): void;

  /**
   * Called by students when they press on an answer.
   * @param optionNumber
   */

  answer(
    context: IContext,
    state: IState,
    params: IParams,
    optionNumber: number
  ): void;

  /**
   * Called by a teacher when they click on "show answers" while the question is
   * being displayed. Also called automatically by the teacher client when the
   * timeout has been reached.
   *
   * Besides showing the answers it also calculates the scores for the players.
   */

  showAnswerAndScore(context: IContext, state: IState, params: IParams): void;

  /**
   * Called by the teacher when clicking on the "show scores" button.
   */
  showScores(context: IContext, state: IState, params: IParams): void;

  /**
   * Called by the teacher when clicking on the "next question" button.
   */
  nextQuestion(context: IContext, state: IState, params: IParams): void;
}
