import QuizDoc from "./QuizDoc";
import { IActions, IContext, IParams, IState, IQuizPresence } from "./types";

/**
 * This class is an implementation of the global actions for the ShareDB
 * backend. Each action call emits an batch op with the required ops.
 */
export default class ShareDBActions implements IActions {
  /**
   * @param db the place to which the ops are submitted
   */
  constructor(private db: H5P.SharedStateClient<QuizDoc, IQuizPresence>) {}

  /**
   * Called by a teacher when the game first starts or when clicking on 'play
   * again' (reset the game then).
   */
  start(context: IContext, state: IState, params: IParams): void {
    /* sample op:      
    	[
        {"p": ["answers"], od: [], oi: [] },
        {"p": ["scores"], od: {}, oi: {} },
        {"p": ["currentQuestionNumber"], od: 0, oi: 0 },
        {"p": ["currentQuestionStart"], od: 0, oi: 0 },
        {"p": ["currentQuestionOrder"], od: [], oi: [0,1,2,4]},
        {"p": ["phase"], od: "preparing", oi: "question" }      
      ]    
    */
    this.db.submitOp([
      // reset all data in case we restart
      { p: ["answers"], od: state.answers, oi: [{}] },
      { p: ["scores"], od: state.scores, oi: {} },
      // start question 0
      ...this.createQuestionOp(0, state, params),
    ]);
  }

  /**
   * Called by students when they press on an answer.
   * @param optionNumber the option the student has chosen
   */
  answer(
    context: IContext,
    state: IState,
    params: IParams,
    optionNumber: number
  ): void {
    this.db.submitOp([
      {
        p: ["answers", state.currentQuestionNumber, context.userId],
        oi: optionNumber,
      },
    ]);
  }

  /**
   * Called by a teacher when they click on "show answers" while the question is
   * being displayed. Also called automatically by the teacher client when the
   * timeout has been reached.
   *
   * Besides showing the answers it also calculates the scores for the players.
   */
  showAnswerAndScore(context: IContext, state: IState, params: IParams): void {
    const participatedUsers = Object.keys(
      state.answers[state.currentQuestionNumber]
    );
    const newScores = participatedUsers.reduce(
      (scores, userId) => {
        if (state.answers[state.currentQuestionNumber][userId] === 0) {
          scores[userId] = (scores[userId] ?? 0) + 1000;
        } else if (!scores[userId]) {
          // first participation of user
          scores[userId] = 0;
        }
        return scores;
      },
      { ...state.scores }
    );

    this.db.submitOp([
      {
        p: ["phase"],
        od: "question",
        oi: "review",
      },
      {
        p: ["scores"],
        od: state.scores,
        oi: newScores,
      },
    ]);
  }

  /**
   * Called by the teacher when clicking on the "show scores" button.
   */
  showScores(context: IContext, state: IState, params: IParams): void {
    this.db.submitOp([
      {
        p: ["phase"],
        od: "review",
        oi: "scores",
      },
    ]);
  }

  /**
   * Called by the teacher when clicking on the "next question" button.
   */
  nextQuestion(context: IContext, state: IState, params: IParams): void {
    this.db.submitOp([
      ...this.createQuestionOp(state.currentQuestionNumber + 1, state, params),
      { p: ["answers", state.answers.length], li: {} },
    ]);
  }

  /**
   * Writes the human-readable name of the user into the state so that others
   * know who the userId is.
   */
  register(context: IContext, state: IState, params: IParams): void {
    this.db.submitOp([
      {
        p: ["users", context.userId],
        oi: context.displayName,
      },
    ]);
  }

  /**
   * Creates a reusable batch op for a new question
   * @param next
   * @param state
   * @param params
   * @returns
   */
  private createQuestionOp = (next: number, state: IState, params: IParams) => [
    { p: ["currentQuestionNumber"], od: state.currentQuestionNumber, oi: next },
    {
      p: ["currentQuestionStart"],
      od: state.currentQuestionStart,
      oi: Date.now(),
    },
    {
      p: ["currentQuestionOrder"],
      od: state.currentQuestionOrder,
      oi: this.shuffle(
        Array(params.questions.params.choices[next].answers.length)
          .fill(1)
          .map((el, i) => i)
      ),
    },
    {
      p: ["phase"],
      od: state.phase,
      oi: "question",
    },
  ];

  /**
   * Shuffles an array in random order. Doesn't mutate the original array.
   * @param arr the array
   * @returns a new array with a random order
   */
  private shuffle(arr: any[]) {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
