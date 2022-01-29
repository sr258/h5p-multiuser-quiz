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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import { sampleParams } from "../sampleParams";
import { IContext, IParams, IState } from "../types";

const scoreIndexToColor = (index: number): string => {
  if (index === 0) {
    return "#b8860b";
  }
  if (index === 1) {
    return "lightslategray";
  }
  return "#664620";
};

export const FinalScores = ({
  context,
  params,
  doc,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
}) => {
  let userScoreIndex = 0;
  if (!context.isTeacher) {
    userScoreIndex = Object.keys(doc.scores)
      .sort((a, b) => doc.scores[b] - doc.scores[a])
      .indexOf(context.userId);
  }
  return context.isTeacher ? (
    <Box>
      <Heading alignSelf="center">Final scores</Heading>
      <Table alignSelf="center">
        <TableHeader>
          <TableCell scope="col" border="bottom"></TableCell>
          <TableCell scope="col" border="bottom">
            Place
          </TableCell>
          <TableCell scope="col" border="bottom">
            Student
          </TableCell>
          <TableCell scope="col" border="bottom">
            Score
          </TableCell>
        </TableHeader>
        <TableBody>
          {Object.keys(doc.scores)
            .sort((a, b) => doc.scores[b] - doc.scores[a])
            .map((userId, index) => (
              <TableRow>
                <TableCell scope="row">
                  {index >= 0 && index <= 2 ? (
                    <FontAwesomeIcon
                      style={{ filter: "drop-shadow(0 0 5px lightgray)" }}
                      icon={faTrophy}
                      color={scoreIndexToColor(index)}
                    />
                  ) : undefined}
                </TableCell>
                <TableCell scope="row">{index + 1}</TableCell>
                <TableCell scope="row">{userId}</TableCell>
                <TableCell scope="row">{doc.scores[userId]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="center" margin={{ top: "large" }}>
        <Button margin="medium" primary label="Play again" />
      </Box>
    </Box>
  ) : (
    <Box>
      <Heading alignSelf="center">Final score</Heading>
      <Box
        background="status-ok"
        round
        margin={{ vertical: "medium" }}
        alignSelf="center"
      >
        <Text margin="large" size="6xl" color="light-1">
          {doc.scores[context.userId]}
        </Text>
      </Box>

      <Box
        background="brand"
        round
        margin={{ vertical: "medium" }}
        alignSelf="center"
        direction="row"
        align="center"
        justify="center"
      >
        <Box margin={{ horizontal: "large" }}>
          <FontAwesomeIcon
            size="5x"
            icon={faTrophy}
            color={scoreIndexToColor(userScoreIndex)}
          />
        </Box>
        <Text margin="large" size="6xl" color="light-1">
          {"# "} {userScoreIndex + 1}
        </Text>
      </Box>
    </Box>
  );
};

preview(FinalScores, {
  teacher: {
    context: {
      userId: "teacher",
      isTeacher: true,
    },
    doc: {
      answers: [],
      currentQuestionOrder: [],
      currentQuestionNumber: 0,
      currentQuestionStart: 0,
      phase: "finalscores",
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
      answers: [],
      currentQuestionOrder: [],
      currentQuestionNumber: 0,
      currentQuestionStart: 0,
      phase: "finalscores",
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
