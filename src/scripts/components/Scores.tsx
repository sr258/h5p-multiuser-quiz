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
import { sampleDoc } from "../testData/sampleDoc";
import { sampleParams } from "../testData/sampleParams";
import { teacherContext } from "../testData/teacherContext";
import { IActions, IContext, IParams, IState } from "../types";

export const Scores = ({
  context,
  params,
  doc,
  actions,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
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
          {Object.keys(doc.scores)
            .sort((a, b) => doc.scores[b] - doc.scores[a])
            .map((userId) => (
              <TableRow>
                <TableCell scope="row">{doc.users[userId] ?? userId}</TableCell>
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
        <Button
          margin="medium"
          primary
          label="Next question"
          onClick={() => {
            actions?.nextQuestion(context, doc, params);
          }}
        />
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
    context: teacherContext,
    doc: {
      ...sampleDoc,
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
    doc: {
      ...sampleDoc,
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
});
