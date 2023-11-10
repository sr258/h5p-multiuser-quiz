import { Box, Heading, Text } from "grommet";
import React from "react";

import { IContext, IParams, IState } from "../types";
import { useTranslation } from "use-h5p";

export const ScoresStudent = ({
  context,
  params,
  state,
}: {
  context: IContext;
  params: IParams;
  state: IState;
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading alignSelf="center">{t("scores-title-student")}</Heading>
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
          {t("scores-not-played")}
        </Text>
      )}
    </Box>
  );
};
