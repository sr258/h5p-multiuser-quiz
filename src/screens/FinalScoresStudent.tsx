import { Box, Heading, Text } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { IContext, IState } from "../types";
import { rankToColor } from "../theme";
import { useTranslation } from "use-h5p";

export const FinalScoresStudent = ({
  context,
  state,
}: {
  context: IContext;
  state: IState;
}) => {
  const { t } = useTranslation();

  let userScoreIndex = 0;
  if (!context.isTeacher) {
    userScoreIndex = Object.keys(state.scores)
      .sort((a, b) => state.scores[b] - state.scores[a])
      .indexOf(context.userId);
  }
  return (
    <Box>
      <Heading alignSelf="center">{t("final-score-title")}</Heading>
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
                  color={rankToColor(userScoreIndex)}
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
          {t("final-score-not-played")}
        </Text>
      )}
    </Box>
  );
};
