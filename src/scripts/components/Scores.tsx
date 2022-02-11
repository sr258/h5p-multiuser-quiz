import { preview } from "@reactpreview/config";
import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import React from "react";

import { sampleState } from "../testData/sampleState";
import { sampleParams } from "../testData/sampleParams";
import { teacherContext } from "../testData/teacherContext";
import { IActions, IContext, IParams, IState } from "../types";

export const Scores = ({
  context,
  params,
  state,
  actions,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
}) => {
  return context.isTeacher ? (
    <Box>
      <Heading alignSelf="center">Current scores</Heading>
      <Table alignSelf="center">
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Score
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(state.scores)
            .sort((a, b) => state.scores[b] - state.scores[a])
            .map((userId) => (
              <TableRow>
                <TableCell scope="row">
                  {state.users[userId] ?? userId}
                </TableCell>
                <TableCell scope="row">{state.scores[userId]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Text margin="medium">
          {"Question "} {state.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Button
          margin="medium"
          primary
          label="Next question"
          onClick={() => {
            actions?.nextQuestion(context, state, params);
          }}
        />
      </Box>
    </Box>
  ) : (
    <Box>
      <Heading alignSelf="center">Current score</Heading>
      {state.scores[context.userId] !== undefined ? (
        <React.Fragment>
          <Box
            background="#48CFAD"
            round
            margin={{ left: "small", right: "small", bottom: "medium" }}
            alignSelf="center"
          >
            <Text margin="large" size="6xl">
              {state.scores[context.userId]}
            </Text>
          </Box>
          <Text margin="medium" alignSelf="center">
            {"Question "} {state.currentQuestionNumber + 1} /{" "}
            {params.questions.params.choices.length}
          </Text>
        </React.Fragment>
      ) : (
        <Text alignSelf="center" size="xlarge">
          You have not played in this quiz yet.
        </Text>
      )}
    </Box>
  );
};

preview(Scores, {
  teacher: {
    context: teacherContext,
    state: {
      ...sampleState,
      phase: "scores",
      scores: {
        user1: 1000,
        user2: 5000,
        user3: 2500,
        user4: 9000,
        user5: 10000,
      },
    },
    params: sampleParams,
  },
  student: {
    context: {
      userId: "user3",
      isTeacher: false,
      displayName: "Real Name 3",
    },
    state: {
      ...sampleState,
      phase: "scores",
      scores: {
        user1: 1000,
        user2: 5000,
        user3: 2500,
        user4: 9000,
        user5: 10000,
      },
    },
    params: sampleParams,
  },
  "student-no-score": {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 3",
    },
    state: {
      ...sampleState,
      phase: "scores",
    },
    params: sampleParams,
  },
});
