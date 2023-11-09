import { Box, Heading, Text } from "grommet";
import React from "react";

import { IContext, IParams, IState } from "../types";

export const ScoresStudent = ({
  context,
  params,
  state,
}: {
  context: IContext;
  params: IParams;
  state: IState;
}) => {
  return (
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
