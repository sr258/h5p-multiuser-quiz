import QuizDoc from "./QuizDoc";
import ShareDBActions from "./ShareDBActions";
import { IContext, IMe, IOtherUser, IParams } from "./types";

export const triggerActions = async (
  context: IContext,
  params: IParams,
  state: QuizDoc,
  me: IMe,
  otherUsers: IOtherUser[],
  actions: ShareDBActions
) => {
  if (me.level === "privileged") {
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
