import QuizDoc from "./QuizDoc";
import ShareDBConnector from "./ShareDBConnector";
import { IActions, IContext, IParams, IState } from "./types";

function shuffle(arr: any[]) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

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
      { p: ["currentQuestionNumber"], od: state.currentQuestionNumber, oi: 0 },
      {
        p: ["currentQuestionStart"],
        od: state.currentQuestionStart,
        oi: Date.now(),
      },
      {
        p: ["currentQuestionOrder"],
        od: state.currentQuestionOrder,
        oi: shuffle(
          Array(params.questions.params.choices[0].answers.length)
            .fill(1)
            .map((el, i) => i)
        ),
      },
      {
        p: ["phase"],
        od: state.phase,
        oi: "question",
      },
    ]);
  }
  answer(
    context: IContext,
    state: IState,
    params: IParams,
    optionNumber: number
  ): void {
    throw new Error("Method not implemented.");
  }
  showAnswerAndScore(context: IContext, state: IState, params: IParams): void {
    throw new Error("Method not implemented.");
  }
  showScores(context: IContext, state: IState, params: IParams): void {
    throw new Error("Method not implemented.");
  }
  nextQuestion(context: IContext, state: IState, params: IParams): void {
    throw new Error("Method not implemented.");
  }
}
