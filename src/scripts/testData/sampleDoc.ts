import { IState } from "../types";

export const sampleDoc: IState = {
  answers: [],
  currentQuestionOrder: [],
  phase: "preparing",
  scores: {},
  users: {},
  currentQuestionNumber: 0,
  currentQuestionStart: Date.now(),
};
