import Color from "color";
import { Box, Text, Button, Grid, Stack, Tag } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faHeart,
  faStar,
  faSquare,
  faCertificate,
  faTimes,
  faCoffee,
  faCube,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { IParams, IState, IContext, IActions, IOtherUser } from "../types";
import { useEffect, useState } from "react";
import { Timer } from "../components/Timer";

const colors = [
  "#DA4453",
  "#FFCE54",
  "#4FC1E9",
  "#A0D468",
  "#37BC9B",
  "#D770AD",
  "#967ADC",
  "#AAB2BD",
];

const icons = [
  <FontAwesomeIcon icon={faCircle} />,
  <FontAwesomeIcon icon={faHeart} />,
  <FontAwesomeIcon icon={faStar} />,
  <FontAwesomeIcon icon={faSquare} />,
  <FontAwesomeIcon icon={faCertificate} />,
  <FontAwesomeIcon icon={faTimes} />,
  <FontAwesomeIcon icon={faCoffee} />,
  <FontAwesomeIcon icon={faCube} />,
];

const maxTime = 20;

export const QuestionTeacher = ({
  context,
  params,
  state,
  actions,
  users,
}: {
  context: IContext;
  params: IParams;
  state: IState;
  actions?: IActions;
  users: IOtherUser[];
}) => {
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
        if (state.phase === "question" && context.isTeacher) {
          actions?.showAnswerAndScore(context, state, params);
        }
      }
      left = left <= 0 ? 0 : left;
      setTimeLeft(left);
    }, 200);

    return () => clearTimeout(timer);
  });

  const currQuestion =
    params.questions.params.choices[state.currentQuestionNumber];

  return (
    <Box fill>
      <Stack fill>
        <Text
          size="3xl"
          dangerouslySetInnerHTML={{
            __html: currQuestion.question,
          }}
          textAlign="center"
        />
        <Box
          pad="medium"
          justify="end"
          direction="row"
          align="center"
          gap="small"
        >
          {Object.keys(state.answers[state.currentQuestionNumber]).length} /
          {users?.length}
          <FontAwesomeIcon icon={faUser} size="2xs" />
        </Box>
      </Stack>
      <Grid
        fill
        columns={{
          size: "large",
        }}
      >
        {Array.from(currQuestion.answers)
          .sort((a, b) => {
            return (
              state.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(a)
              ) -
              state.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(b)
              )
            );
          })
          .map((q, index) => (
            <Box
              key={`${index}-${q}`}
              border={{
                size: "3px",
                color:
                  state.phase === "question" ||
                  (state.phase === "review" &&
                    currQuestion.answers.indexOf(q) !== 0)
                    ? "transparent"
                    : undefined,
              }}
              margin="small"
              round
              align="center"
              background={{
                color:
                  state.phase === "review" &&
                  currQuestion.answers.indexOf(q) !== 0
                    ? new Color(colors[index])
                        .alpha(0.4)
                        .lighten(0.1)
                        .rgb()
                        .string()
                    : colors[index],
              }}
            >
              <Stack fill guidingChild={1} margin={{ vertical: "small" }}>
                <Box
                  align="start"
                  fill
                  justify="center"
                  margin={{ left: "medium" }}
                >
                  {icons[index]}
                </Box>
                <Box
                  fill="vertical"
                  align="center"
                  justify="center"
                  margin={{ horizontal: "xlarge" }}
                >
                  <Text
                    textAlign="center"
                    dangerouslySetInnerHTML={{ __html: q }}
                  ></Text>
                </Box>
                {state.phase === "review" && (
                  <Box
                    fill
                    justify="center"
                    align="end"
                    pad={{
                      right: "small",
                    }}
                  >
                    <Tag
                      value={
                        Object.values(
                          state.answers[state.currentQuestionNumber]
                        ).filter((a) => a === index).length
                      }
                    />
                  </Box>
                )}
              </Stack>
            </Box>
          ))}
      </Grid>
      <Box direction="row" justify="between" align="center">
        <Text margin="medium">
          {"Question "} {state.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        {state.phase === "question" && (
          <Box margin="medium">
            <Timer left={timeLeft} max={maxTime} />
          </Box>
        )}
        {state.phase === "question" && (
          <Button
            margin="medium"
            label="Show answer"
            onClick={() => {
              actions?.showAnswerAndScore(context, state, params);
            }}
          />
        )}
        {state.phase === "review" && (
          <Button
            margin="medium"
            label="Show scores"
            onClick={() => {
              actions?.showScores(context, state, params);
            }}
          />
        )}
      </Box>
    </Box>
  );
};
