import React from "react";
import { Box, Grommet } from "grommet";
import { preview } from "@reactpreview/config";

import { FinalScores } from "./FinalScores";
import { Preparing } from "./Preparing";
import { Question } from "./Question";
import { Scores } from "./Scores";
import { IParams, IState, IContext } from "../types";
import { Initializing } from "./Initializing";
import { sampleParams } from "../sampleParams";

export const Main = ({
  context,
  doc,
  params,
}: {
  context: IContext;
  doc?: IState;
  params: IParams;
}) => {
  return (
    <Grommet plain>
      {doc !== undefined ? (
        <Box>
          {doc.phase === "preparing" && (
            <Preparing context={context} doc={doc} params={params}></Preparing>
          )}
          {doc.phase === "question" && (
            <Question params={params} context={context} doc={doc}></Question>
          )}
          {doc.phase === "review" && (
            <Question params={params} context={context} doc={doc}></Question>
          )}
          {doc.phase === "scores" && (
            <Scores params={params} context={context} doc={doc} />
          )}
          {doc.phase === "finalscores" && (
            <FinalScores params={params} context={context} doc={doc} />
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
    doc: {
      answers: [],
      currentQuestionOrder: [],
      phase: "preparing",
      scores: {},
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now(),
    },
    params: sampleParams,
  },
  "preparing-student": {
    context: {
      isTeacher: false,
      userId: "",
    },
    doc: {
      answers: [],
      currentQuestionOrder: [],
      phase: "preparing",
      scores: {},
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now(),
    },
    params: sampleParams,
  },
});
