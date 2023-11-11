import {
  Box,
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import React from "react";

import { IActions, IContext, IParams, IState } from "../types";
import { useTranslation } from "use-h5p";

export const ScoresTeacher = ({
  context,
  params,
  state,
  actions,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
}) => {
  const { t, tOpts } = useTranslation();

  return (
    <Box>
      <Heading alignSelf="center">{t("scores-title-teacher")}</Heading>
      <Table alignSelf="center">
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              {t("scores-table-name")}
            </TableCell>
            <TableCell scope="col" border="bottom">
              {t("scores-table-score")}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(state.scores)
            .sort((a, b) => state.scores[b] - state.scores[a])
            .map((userId) => (
              <TableRow>
                <TableCell scope="row">
                  {state.users[userId] ?? userId}
                </TableCell>
                <TableCell scope="row">{state.scores[userId]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box direction="row" justify="between" margin={{ top: "medium" }}>
        <Text margin="medium">
          {tOpts("current-question", {
            "%current": state.currentQuestionNumber + 1,
            "%total": params.questions.params.choices.length,
          })}
        </Text>
        <Button
          margin="medium"
          primary
          label={t('scores-next-question')}
          onClick={() => {
            actions?.nextQuestion(context, state, params);
          }}
        />
      </Box>
    </Box>
  );
};
