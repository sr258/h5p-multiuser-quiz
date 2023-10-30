import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam, faU, faUser } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box, Button, Avatar } from "grommet";
import { IParams, IState, IContext, IActions, IActiveUser } from "../types";

export const Preparing = ({
  context,
  params,
  state,
  actions,
  title,
  users,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
  title: string;
  users?: IActiveUser[];
}) => {
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{title}</Heading>
      {context.isTeacher ? (
        <React.Fragment>
          <Text textAlign="center">
            Press the "Start" button when all participants have joined.
          </Text>
          <Box margin="medium" width="100%" wrap direction="row" overflow="scroll">
            {users?.map((u) => (
              <Box margin="small" direction="row" gap="small" align="center">
                <Avatar background="brand" size="small" >
                  <FontAwesomeIcon icon={faUser} size="2xs" />
                </Avatar>
                <Text>{u.displayName}</Text>
              </Box>
            ))}
          </Box>
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
              actions?.start(context, state, params);
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
