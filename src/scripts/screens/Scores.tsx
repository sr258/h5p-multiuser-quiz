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
            margin={{ horizontal: "medium", bottom: "medium" }}
            alignSelf="center"
          >
            <Text margin="large" size="4xl">
              {state.scores[context.userId]}
            </Text>
          </Box>
          <Text margin="medium" alignSelf="center">
            {"Question "} {state.currentQuestionNumber + 1} /{" "}
            {params.questions.params.choices.length}
          </Text>
        </React.Fragment>
      ) : (
        <Text alignSelf="center" size="xlarge" textAlign="center">
          You have not played in this quiz yet.
        </Text>
      )}
    </Box>
  );
};
