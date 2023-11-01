import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam, faUser } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box, Button, Avatar } from "grommet";
import { IParams, IState, IContext, IActions, IOtherUser } from "../types";

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
  users?: IOtherUser[];
}) => {
  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{title}</Heading>
      {context.isTeacher ? (
        <React.Fragment>
          {users && users.length > 0 ? (
            <Text textAlign="center">{users?.length} participants:</Text>
          ) : (
            <Text>No participants have joined yet.</Text>
          )}
          <Box
            margin="medium"
            width="100%"
            wrap
            direction="row"
            justify="center"
          >
            {users?.map((u) => (
              <Box
                key={u?.presenceId}
                margin="small"
                direction="row"
                gap="small"
                align="center"
              >
                <Avatar background="brand" size="small">
                  <FontAwesomeIcon icon={faUser} size="2xs" />
                </Avatar>
                <Text>{u?.name}</Text>
              </Box>
            ))}
          </Box>
          <Text textAlign="center">
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
