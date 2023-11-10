import { Box } from "grommet";

import { Deleted } from "./Deleted";
import { Error } from "./Error";
import { FinalScoresStudent } from "./FinalScoresStudent";
import { FinalScoresTeacher } from "./FinalScoresTeacher";
import { Initializing } from "./Initializing";
import { PreparingStudent } from "./PreparingStudent";
import { PreparingTeacher } from "./PreparingTeacher";
import { QuestionStudent } from "./QuestionStudent";
import { QuestionTeacher } from "./QuestionTeacher";
import { ScoresStudent } from "./ScoresStudent";
import { ScoresTeacher } from "./ScoresTeacher";

import {
  IParams,
  IState,
  IContext,
  IActions,
  IMetadata,
  IOtherUser,
} from "../types";

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
