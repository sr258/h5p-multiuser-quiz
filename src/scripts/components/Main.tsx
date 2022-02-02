import React from "react";
import { Box, Grommet } from "grommet";
import { preview } from "@reactpreview/config";

import { FinalScores } from "./FinalScores";
import { Preparing } from "./Preparing";
import { Question } from "./Question";
import { Scores } from "./Scores";
import { IParams, IState, IContext, IActions } from "../types";
import { Initializing } from "./Initializing";
import { sampleParams } from "../testData/sampleParams";
import { sampleDoc } from "../testData/sampleDoc";

export const Main = ({
  context,
  doc,
  params,
  actions,
}: {
  context: IContext;
  doc?: IState;
  params: IParams;
  actions?: IActions;
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
          <Initializing params={params} />
        </Box>
      )}
    </Grommet>
  );
};

preview(Main, {
  connecting: {
    context: {
      isTeacher: true,
      userId: "",
    },
    doc: undefined,
    params: sampleParams,
  },
  "preparing-teacher": {
    context: {
      isTeacher: true,
      userId: "",
    },
    doc: sampleDoc,
    params: sampleParams,
  },
  "preparing-student": {
    context: {
      isTeacher: false,
      userId: "",
    },
    doc: sampleDoc,
    params: sampleParams,
  },
});
