export type Phases =
  | "preparing"
  | "question"
  | "review"
  | "scores"
  | "finalscores";

export interface IState {
  answers: {
    [userId: string]: number;
  }[];

  scores: {
    [userId: string]: number;
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
