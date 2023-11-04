import React from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import { IActions, IContext, IParams, IState } from "../types";
import { rankToColor } from "../helpers/colors";

export const FinalScoresTeacher = ({
  context,
  params,
  state,
  actions,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
}) => (
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
                    color={rankToColor(index)}
                  />
                ) : undefined}
              </TableCell>
              <TableCell scope="row">{index + 1}</TableCell>
              <TableCell scope="row">{state.users[userId] ?? userId}</TableCell>
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
);
