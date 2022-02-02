import QuizDoc from "./QuizDoc";
import ShareDBConnector from "./ShareDBConnector";
import { IActions, IContext, IParams, IState } from "./types";

function shuffle(arr: any[]) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const createQuestionOp = (next: number, state: IState, params: IParams) => [
  { p: ["currentQuestionNumber"], od: state.currentQuestionNumber, oi: next },
  {
    p: ["currentQuestionStart"],
    od: state.currentQuestionStart,
    oi: Date.now(),
  },
  {
    p: ["currentQuestionOrder"],
    od: state.currentQuestionOrder,
    oi: shuffle(
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

export default class ShareDBActions implements IActions {
  constructor(private db: ShareDBConnector<QuizDoc>) {}

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
      ...createQuestionOp(0, state, params),
    ]);
  }
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
  showScores(context: IContext, state: IState, params: IParams): void {
    this.db.submitOp([
      {
        p: ["phase"],
        od: "review",
        oi: "scores",
      },
    ]);
  }
  nextQuestion(context: IContext, state: IState, params: IParams): void {
    this.db.submitOp([
      ...createQuestionOp(state.currentQuestionNumber + 1, state, params),
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
}
