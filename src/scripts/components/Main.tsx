import { Box } from "grommet";

import { FinalScores } from "./FinalScores";
import { Preparing } from "./Preparing";
import { Question } from "./Question";
import { Scores } from "./Scores";
import {
  IParams,
  IState,
  IContext,
  IActions,
  IMetadata,
  IOtherUser,
} from "../types";
import { Initializing } from "./Initializing";
import { Deleted } from "./Deleted";
import { Error } from "./Error";

export const Main = ({
  context,
  state,
  params,
  actions,
  deleted,
  error,
  metadata,
  users,
}: {
  context: IContext;
  state?: IState;
  params: IParams;
  actions?: IActions;
  deleted?: boolean;
  error?: string;
  metadata: IMetadata;
  users?: IOtherUser[];
}) => {
  return state !== undefined ? (
    <Box fill>
      {state.phase === "preparing" && (
        <Preparing
          context={context}
          state={state}
          params={params}
          actions={actions}
          title={metadata.title}
          users={users}
        ></Preparing>
      )}
      {state.phase === "question" && (
        <Question
          params={params}
          context={context}
          state={state}
          actions={actions}
          users={users}
        ></Question>
      )}
      {state.phase === "review" && (
        <Question
          params={params}
          context={context}
          state={state}
          actions={actions}
        ></Question>
      )}
      {state.phase === "scores" &&
        state.currentQuestionNumber !==
          params.questions.params.choices.length - 1 && (
          <Scores
            params={params}
            context={context}
            state={state}
            actions={actions}
          />
        )}
      {state.phase === "scores" &&
        state.currentQuestionNumber ===
          params.questions.params.choices.length - 1 && (
          <FinalScores
            params={params}
            context={context}
            state={state}
            actions={actions}
          />
        )}
    </Box>
  ) : (
    <Box>
      {!deleted && !error && (
        <Initializing params={params} title={metadata.title} />
      )}
      {deleted && <Deleted params={params} title={metadata.title} />}
      {error && (
        <Error params={params} errorMessage={error} title={metadata.title} />
      )}
    </Box>
  );
};
