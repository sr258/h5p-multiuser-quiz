import { Box, Grommet } from "grommet";
import { preview } from "@reactpreview/config";

import { FinalScores } from "./FinalScores";
import { Preparing } from "./Preparing";
import { Question } from "./Question";
import { Scores } from "./Scores";
import { IParams, IState, IContext, IActions, IMetadata } from "../types";
import { Initializing } from "./Initializing";
import { sampleParams } from "../testData/sampleParams";
import { sampleDoc } from "../testData/sampleDoc";
import { teacherContext } from "../testData/teacherContext";
import { Deleted } from "./Deleted";
import { Error } from "./Error";
import { sampleMetadata } from "../testData/sampleMetadata";

export const Main = ({
  context,
  doc,
  params,
  actions,
  deleted,
  error,
  metadata,
}: {
  context: IContext;
  doc?: IState;
  params: IParams;
  actions?: IActions;
  deleted?: boolean;
  error?: string;
  metadata: IMetadata;
}) => {
  return (
    <Grommet plain>
      {doc !== undefined ? (
        <Box>
          {doc.phase === "preparing" && (
            <Preparing
              context={context}
              doc={doc}
              params={params}
              actions={actions}
              title={metadata.title}
            ></Preparing>
          )}
          {doc.phase === "question" && (
            <Question
              params={params}
              context={context}
              doc={doc}
              actions={actions}
            ></Question>
          )}
          {doc.phase === "review" && (
            <Question
              params={params}
              context={context}
              doc={doc}
              actions={actions}
            ></Question>
          )}
          {doc.phase === "scores" &&
            doc.currentQuestionNumber !==
              params.questions.params.choices.length - 1 && (
              <Scores
                params={params}
                context={context}
                doc={doc}
                actions={actions}
              />
            )}
          {doc.phase === "scores" &&
            doc.currentQuestionNumber ===
              params.questions.params.choices.length - 1 && (
              <FinalScores
                params={params}
                context={context}
                doc={doc}
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

preview(Main, {
  connecting: {
    context: teacherContext,
    doc: undefined,
    params: sampleParams,
    metadata: sampleMetadata,
  },
  deleted: {
    context: teacherContext,
    doc: undefined,
    params: sampleParams,
    deleted: true,
    metadata: sampleMetadata,
  },
  error: {
    context: teacherContext,
    doc: undefined,
    params: sampleParams,
    error: "Some weird error message",
    metadata: sampleMetadata,
  },
  "preparing-teacher": {
    context: teacherContext,
    doc: sampleDoc,
    params: sampleParams,
    metadata: sampleMetadata,
  },
  "preparing-student": {
    context: {
      displayName: "Student",
      isTeacher: false,
      userId: "student",
    },
    doc: sampleDoc,
    params: sampleParams,
    metadata: sampleMetadata,
  },
});
