import React from "react";
import { Heading, Text, Box, Button } from "grommet";
import { IParams, IState, IContext } from "../types";

export const Preparing = ({
  context,
  params,
  doc,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
}) => {
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{params.questions.metadata.title}</Heading>
      {context.isTeacher ? (
        <React.Fragment>
          <Text>
            Press the "Start" button when all participants have joined.
          </Text>
          <Button margin="medium" alignSelf="center" label="Start" />
        </React.Fragment>
      ) : (
        <Text>Please wait for your teacher to start the quiz.</Text>
      )}
    </Box>
  );
};
