import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box, Button } from "grommet";
import { IParams, IState, IContext, IActions } from "../types";

export const Preparing = ({
  context,
  params,
  doc,
  actions,
  title,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
  actions?: IActions;
  title: string;
}) => {
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{title}</Heading>
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
            onClick={() => {
              actions?.start(context, doc, params);
            }}
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
