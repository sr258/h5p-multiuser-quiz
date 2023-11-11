/**
 * Client-side triggers that are used to modify the global shared state
 * according to certain conditions.
 */

import QuizDoc from "./QuizDoc";
import ShareDBActions from "./ShareDBActions";
import { IContext, IOtherUser, IParams } from "./types";

export const triggerActions = async (
  context: IContext,
  params: IParams,
  state: QuizDoc,
  otherUsers: IOtherUser[],
  actions: ShareDBActions
) => {
  if (context.isTeacher) {
    if (state.phase === "question") {
      if (
        Object.keys(state.answers[state.currentQuestionNumber]).length ===
        otherUsers.filter((u) => u.level !== "privileged").length
      ) {
        actions.showAnswerAndScore(context, state, params);
      }
    }
  }
};
