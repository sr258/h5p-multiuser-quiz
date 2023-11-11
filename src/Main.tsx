import { Box } from "grommet";

import { Deleted } from "./screens/Deleted";
import { Error } from "./screens/Error";
import { FinalScoresStudent } from "./screens/FinalScoresStudent";
import { FinalScoresTeacher } from "./screens/FinalScoresTeacher";
import { Initializing } from "./screens/Initializing";
import { PreparingStudent } from "./screens/PreparingStudent";
import { PreparingTeacher } from "./screens/PreparingTeacher";
import { QuestionStudent } from "./screens/QuestionStudent";
import { QuestionTeacher } from "./screens/QuestionTeacher";
import { ScoresStudent } from "./screens/ScoresStudent";
import { ScoresTeacher } from "./screens/ScoresTeacher";

import {
  IParams,
  IState,
  IContext,
  IActions,
  IMetadata,
  IOtherUser,
} from "./types";

const getScreen = ({
  context,
  state,
  params,
  actions,
  metadata,
  users,
}: {
  context: IContext;
  state: IState;
  params: IParams;
  actions?: IActions;
  deleted?: boolean;
  error?: string;
  metadata: IMetadata;
  users: IOtherUser[];
}) => {
  switch (state.phase) {
    case "preparing":
      if (context.isTeacher) {
        return (
          <PreparingTeacher
            context={context}
            state={state}
            params={params}
            actions={actions}
            metadata={metadata}
            users={users}
          ></PreparingTeacher>
        );
      } else {
        return <PreparingStudent metadata={metadata}></PreparingStudent>;
      }
    case "question":
    case "review":
      if (context.isTeacher) {
        return <QuestionTeacher
          params={params}
          context={context}
          state={state}
          actions={actions}
          users={users}
        ></QuestionTeacher>;
      } else {
        return (
          <QuestionStudent
            params={params}
            context={context}
            state={state}
            actions={actions}
          ></QuestionStudent>
        );
      }
      break;
    case "scores":
      if (
        state.currentQuestionNumber !==
        params.questions.params.choices.length - 1
      ) {
        if (context.isTeacher) {
          return (
            <ScoresTeacher
              params={params}
              context={context}
              state={state}
              actions={actions}
            />
          );
        } else {
          <ScoresStudent params={params} context={context} state={state} />;
        }
      } else {
        if (context.isTeacher) {
          return (
            <FinalScoresTeacher
              params={params}
              context={context}
              state={state}
              actions={actions}
            />
          );
        } else {
          return <FinalScoresStudent context={context} state={state} />;
        }
      }
  }
};

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
  users: IOtherUser[];
}) => {
  return state !== undefined ? (
    <Box fill>
      {getScreen({
        context,
        state,
        params,
        actions,
        deleted,
        error,
        metadata,
        users,
      })}
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
