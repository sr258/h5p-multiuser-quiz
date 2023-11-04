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
import React from "react";

import { IActions, IContext, IParams, IState } from "../types";

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
  state,
  actions,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
}) => {
  let userScoreIndex = 0;
  if (!context.isTeacher) {
    userScoreIndex = Object.keys(state.scores)
      .sort((a, b) => state.scores[b] - state.scores[a])
      .indexOf(context.userId);
  }
  return context.isTeacher ? (
    <Box>
      <Heading alignSelf="center">Final scores</Heading>
      <Table alignSelf="center">
        <TableHeader>
          <TableRow>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(state.scores)
            .sort((a, b) => state.scores[b] - state.scores[a])
            .map((userId, index) => (
              <TableRow key={userId}>
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
                <TableCell scope="row">
                  {state.users[userId] ?? userId}
                </TableCell>
                <TableCell scope="row">{state.scores[userId]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="center" margin={{ top: "medium" }}>
        <Button
          margin="medium"
          primary
          label="Play again"
          onClick={() => {
            actions?.reset(context, state, params);
          }}
        />
      </Box>
    </Box>
  ) : (
    <Box>
      <Heading alignSelf="center">Final score</Heading>
      {userScoreIndex !== -1 ? (
        <React.Fragment>
          <Box
            background="status-ok"
            round
            margin={{ bottom: "medium" }}
            alignSelf="center"
          >
            <Text margin="large" size="4xl" color="light-1">
              {state.scores[context.userId]}
            </Text>
          </Box>

          <Box
            background="light-3"
            round
            margin={{ vertical: "small" }}
            alignSelf="center"
            direction="row"
            align="center"
            justify="center"
          >
            {userScoreIndex <= 2 && (
              <Box margin={{ left: "large", right: "small" }}>
                <FontAwesomeIcon
                  size="4x"
                  icon={faTrophy}
                  color={scoreIndexToColor(userScoreIndex)}
                />
              </Box>
            )}
            <Text margin="large" size="4xl">
              {"# "} {userScoreIndex + 1}
            </Text>
          </Box>
        </React.Fragment>
      ) : (
        <Text size="xlarge" alignSelf="center" textAlign="center">
          You haven't played in this quiz!
        </Text>
      )}
    </Box>
  );
};