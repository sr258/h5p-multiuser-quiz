import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Heading, Text, Box, Button, Avatar } from "grommet";
import {
  IParams,
  IState,
  IContext,
  IActions,
  IOtherUser,
  IMetadata,
} from "../types";
import { useTranslation } from "use-h5p";

export const PreparingTeacher = ({
  context,
  params,
  state,
  actions,
  metadata,
  users,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
  metadata: IMetadata;
  users?: IOtherUser[];
}) => {
  const { t, tOpts } = useTranslation();

  return (
    <Box fill="vertical" align="center">
      <Heading textAlign="center">{metadata.title}</Heading>
      <React.Fragment>
        {users && users.length > 0 ? (
          <Text textAlign="center">
            {tOpts("preparing-teacher-participants", {
              "%number": users?.length,
            })}
          </Text>
        ) : (
          <Text>{t("preparing-teacher-no-participants")}</Text>
        )}
        {users?.length && users?.length > 0 ? (
          <React.Fragment>
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
                  margin={{ vertical: "0.4em", horizontal: "small" }}
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
            <Text textAlign="center">{t("preparing-teacher-instruction")}</Text>
            <Button
              primary
              margin="medium"
              alignSelf="center"
              label={
                <Box>
                  <Text margin="medium">{t("preparing-teacher-start")}</Text>
                </Box>
              }
              onClick={() => {
                actions?.start(context, state, params);
              }}
            />
          </React.Fragment>
        ) : undefined}
      </React.Fragment>
    </Box>
  );
};
