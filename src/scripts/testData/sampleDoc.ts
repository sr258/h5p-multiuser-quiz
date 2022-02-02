import { IState } from "../types";

export const sampleDoc: IState = {
  answers: [],
  currentQuestionOrder: [],
  phase: "preparing",
  scores: {},
  users: {
    user1: "Real Name 1",
    user2: "Real Name 2",
    user3: "Real Name 3",
    user4: "Real Name 4",
    user5: "Real Name 5",
  },
  currentQuestionNumber: 0,
  currentQuestionStart: Date.now(),
};
