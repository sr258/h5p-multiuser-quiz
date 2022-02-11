import { Box, Grommet } from "grommet";
import { preview } from "@reactpreview/config";

import { FinalScores } from "./FinalScores";
import { Preparing } from "./Preparing";
import { Question } from "./Question";
import { Scores } from "./Scores";
import { IParams, IState, IContext, IActions, IMetadata } from "../types";
import { Initializing } from "./Initializing";
import { sampleParams } from "../testData/sampleParams";
import { sampleState } from "../testData/sampleState";
import { teacherContext } from "../testData/teacherContext";
import { Deleted } from "./Deleted";
import { Error } from "./Error";
import { sampleMetadata } from "../testData/sampleMetadata";

export const Main = ({
  context,
  state,
  params,
  actions,
  deleted,
  error,
  metadata,
}: {
  context: IContext;
  state?: IState;
  params: IParams;
  actions?: IActions;
  deleted?: boolean;
  error?: string;
  metadata: IMetadata;
}) => {
  return (
    <Grommet plain>
      {state !== undefined ? (
        <Box>
          {state.phase === "preparing" && (
            <Preparing
              context={context}
              state={state}
              params={params}
              actions={actions}
              title={metadata.title}
            ></Preparing>
          )}
          {state.phase === "question" && (
            <Question
              params={params}
              context={context}
              state={state}
              actions={actions}
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
            <Error
              params={params}
              errorMessage={error}
              title={metadata.title}
            />
          )}
        </Box>
      )}
    </Grommet>
  );
};

/* devblock:start */
preview(Main, {
  connecting: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    metadata: sampleMetadata,
  },
  deleted: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    deleted: true,
    metadata: sampleMetadata,
  },
  error: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    error: "Some weird error message",
    metadata: sampleMetadata,
  },
  "preparing-teacher": {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
  },
  "preparing-student": {
    context: {
      displayName: "Student",
      isTeacher: false,
      userId: "student",
    },
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
  },
});
/* devblock:end */