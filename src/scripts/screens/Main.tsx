import { Box } from "grommet";

import { FinalScoresStudent } from "./FinalScoresStudent";
import { PreparingStudent } from "./PreparingStudent";
import { QuestionStudent } from "./QuestionStudent";
import { ScoresStudent } from "./ScoresStudent";
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
import { FinalScoresTeacher } from "./FinalScoresTeacher";
import { PreparingTeacher } from "./PreparingTeacher";
import { QuestionTeacher } from "./QuestionTeacher";
import { ScoresTeacher } from "./ScoresTeacher";

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
        <QuestionTeacher
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
