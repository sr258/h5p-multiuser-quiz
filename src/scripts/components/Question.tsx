import { preview } from "@reactpreview/config";
import Color from "color";
import { Box, Text, Heading, Button, Grid, Stack, Tag, Meter } from "grommet";
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { sampleParams } from "../testData/sampleParams";
import { IParams, IState, IContext, IActions } from "../types";
import { useEffect, useState } from "react";
import { Timer } from "./Timer";
import { sampleState } from "../testData/sampleState";
import { teacherContext } from "../testData/teacherContext";

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

export const Question = ({
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

  return context.isTeacher ? (
    <Box>
      <Text
        size="3xl"
        dangerouslySetInnerHTML={{
          __html: currQuestion.question,
        }}
        textAlign="center"
      />
      <Grid
        columns={{
          count: 2,
          size: "medium",
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
              key={q}
            >
              <Stack fill margin={{ vertical: "small" }}>
                <Box alignSelf="start" margin="medium">
                  {icons[index]}
                </Box>
                <Box fill align="center" justify="center">
                  <Box
                    margin={{ left: "large", right: "large" }}
                    justify="center"
                  >
                    <Text
                      textAlign="center"
                      dangerouslySetInnerHTML={{ __html: q }}
                    ></Text>
                  </Box>
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
        <Text margin="medium">
          {"Given answers: "}
          {Object.keys(state.answers[state.currentQuestionNumber]).length}
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
  ) : state.phase === "question" ? (
    <Box>
      <Grid
        columns={{
          count: 2,
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
                label={<Text size="xlarge">{icons[index]}</Text>}
                color={colors[index]}
                primary
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
      <Box direction="row" justify="between">
        <Text margin="medium">
          {"Question "} {state.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
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
          <Text size="xlarge">You haven't given an answer.</Text>
        </Box>
      )}
    </Box>
  );
};

/* devblock:start */
preview(Question, {
  "teacher-unanswered": {
    context: teacherContext,
    state: {
      ...sampleState,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
    },
    params: sampleParams,
  },
  "teacher-review": {
    context: teacherContext,
    state: {
      ...sampleState,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
    },
    params: sampleParams,
  },
  "student-unanswered": {
    context: {
      userId: "user4",
      isTeacher: false,
      displayName: "Real Name 4",
    },
    state: {
      ...sampleState,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
    },
    params: sampleParams,
  },
  "student-answered": {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 1",
    },
    state: {
      ...sampleState,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
    },
    params: sampleParams,
  },
  "student-review-correct": {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 1",
    },
    state: {
      ...sampleState,
      answers: [{ user1: 0, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
    },
    params: sampleParams,
  },
  "student-review-wrong": {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 1",
    },
    state: {
      ...sampleState,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
    },
    params: sampleParams,
  },

  "student-review-no-answer": {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 1",
    },
    state: {
      ...sampleState,
      answers: [{ user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
    },
    params: sampleParams,
  },
});
/* devblock:end */
