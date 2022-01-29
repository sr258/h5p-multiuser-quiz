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
import { sampleParams } from "../sampleParams";
import { IContext, IParams, IState } from "../types";

export const Scores = ({
  context,
  params,
  doc,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
}) => {
  return context.isTeacher ? (
    <Box>
      <Heading alignSelf="center">Current scores</Heading>
      <Table alignSelf="center">
        <TableHeader>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
          <TableCell scope="col" border="bottom">
            Score
          </TableCell>
        </TableHeader>
        <TableBody>
          {Object.keys(doc.scores)
            .sort((a, b) => doc.scores[b] - doc.scores[a])
            .map((userId) => (
              <TableRow>
                <TableCell scope="row">{userId}</TableCell>
                <TableCell scope="row">{doc.scores[userId]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Text margin="medium">
          {"Question "} {doc.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Button margin="medium" primary label="Next question" />
      </Box>
    </Box>
  ) : (
    <Box>
      <Heading alignSelf="center">Current score</Heading>
      <Box
        background="#48CFAD"
        round
        margin={{ left: "small", right: "small", bottom: "medium" }}
        alignSelf="center"
      >
        <Text margin="large" size="6xl">
          {doc.scores[context.userId]}
        </Text>
      </Box>
      <Text margin="medium" alignSelf="center">
        {"Question "} {doc.currentQuestionNumber + 1} /{" "}
        {params.questions.params.choices.length}
      </Text>
    </Box>
  );
};

preview(Scores, {
  teacher: {
    context: {
      userId: "teacher",
      isTeacher: true,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
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
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
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
});
