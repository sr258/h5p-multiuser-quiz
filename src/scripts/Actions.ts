import { IActions, IContext, IParams, IState } from "./types";

export default class Actions implements IActions {
  start(context: IContext, state: IState, params: IParams): void {
    throw new Error("Method not implemented.");
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
