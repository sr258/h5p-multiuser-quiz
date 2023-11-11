import { Box, Text, Button, Grid } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

import { IParams, IState, IContext, IActions } from "../types";
import { useEffect, useState } from "react";
import { Timer } from "../components/Timer";
import { useTranslation } from "use-h5p";
import { questionColors } from "../theme";
import { questionIcons } from "../theme";

const maxTime = 20;

export const QuestionStudent = ({
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

  const calculateTimeLeft = () => {
    return Math.round(
      (maxTime * 1000 - (Date.now() - state.currentQuestionStart)) / 1000
    );
  };

  const [timeLeft, setTimeLeft] = useState<number>(maxTime);

  useEffect(() => {
    const timer = setInterval(() => {
      let left = calculateTimeLeft();
      if (left <= 0) {
        clearTimeout(timer);
      }
      left = left <= 0 ? 0 : left;
      setTimeLeft(left);
    }, 200);

    return () => clearTimeout(timer);
  });

  const currQuestion =
    params.questions.params.choices[state.currentQuestionNumber];

  return state.phase === "question" ? (
    <Box fill align="center">
      <Grid
        fill
        width={{ max: "60em" }}
        columns={{
          size: "medium",
        }}
      >
        {Array.from(currQuestion.answers)
          .sort(
            (a, b) =>
              state.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(b)
              ) -
              state.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(a)
              )
          )
          .map((q, index) => (
            <Box margin="small" height="6em" key={index}>
              <Button
                key={q}
                disabled={
                  state.answers[state.currentQuestionNumber] !== undefined &&
                  state.answers[state.currentQuestionNumber][context.userId] !==
                    undefined &&
                  state.answers[state.currentQuestionNumber][context.userId] !==
                    state.currentQuestionOrder[index]
                }
                label={<Text size="xlarge">{questionIcons[index]}</Text>}
                color={questionColors[index]}                
                fill
                onClick={() => {
                  actions?.answer(
                    context,
                    state,
                    params,
                    state.currentQuestionOrder[index]
                  );
                }}
              ></Button>
            </Box>
          ))}
      </Grid>
      <Box direction="row" fill="horizontal" justify="between" align="center">
        <Text margin="medium">
          {tOpts("current-question", {
            "%current": state.currentQuestionNumber + 1,
            "%total": params.questions.params.choices.length,
          })}
        </Text>
        <Box margin="medium">
          <Timer left={timeLeft} max={maxTime} />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>
      {state.answers[state.currentQuestionNumber][context.userId] !==
      undefined ? (
        <Box
          margin="medium"
          round
          height="12em"
          background={
            state.answers[state.currentQuestionNumber][context.userId] === 0
              ? "status-ok"
              : "status-error"
          }
        >
          <Box fill align="center" justify="center">
            <FontAwesomeIcon
              color="white"
              size="4x"
              icon={
                state.answers[state.currentQuestionNumber][context.userId] === 0
                  ? faCheck
                  : faTimes
              }
            />
          </Box>
        </Box>
      ) : (
        <Box
          margin="medium"
          round
          height="12em"
          background="light-4"
          align="center"
          justify="center"
        >
          <Text textAlign="center" size="xlarge">
            {t("review-no-answer")}
          </Text>
        </Box>
      )}
    </Box>
  );
};
