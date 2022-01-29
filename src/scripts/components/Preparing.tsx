import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";

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
          <Button
            primary
            margin="medium"
            alignSelf="center"
            label={
              <Box>
                <Text margin="medium">Start</Text>
              </Box>
            }
          />
        </React.Fragment>
      ) : (
        <Box align="center">
          <Box margin="large">
            <FontAwesomeIcon color="#FFC300" size="5x" icon={faLaughBeam} />
          </Box>
          <Text>Please wait for your teacher to start the quiz...</Text>
        </Box>
      )}
    </Box>
  );
};
