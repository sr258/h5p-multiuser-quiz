import { Box } from "grommet";

import { FinalScoresStudent } from "./FinalScoresStudent";
import { PreparingStudent } from "./PreparingStudent";
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
import { FinalScoresTeacher } from "./FinalScoresTeacher";
import { PreparingTeacher } from "./PreparingTeacher";

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
      return (
        <Question
          params={params}
          context={context}
          state={state}
          actions={actions}
          users={users}
        ></Question>
      );
    case "review":
      return (
        <Question
          params={params}
          context={context}
          state={state}
          actions={actions}
          users={users}
        ></Question>
      );
    case "scores":
      if (
        state.currentQuestionNumber !==
        params.questions.params.choices.length - 1
      ) {
        return (
          <Scores
            params={params}
            context={context}
            state={state}
            actions={actions}
          />
        );
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
