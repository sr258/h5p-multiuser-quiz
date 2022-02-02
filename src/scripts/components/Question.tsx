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
import { sampleDoc } from "../testData/sampleDoc";
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
  doc,
  actions,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
  actions?: IActions;
}) => {
  const calculateTimeLeft = () => {
    return Math.round(
      (maxTime * 1000 - (Date.now() - doc.currentQuestionStart)) / 1000
    );
  };

  const [timeLeft, setTimeLeft] = useState<number>(maxTime);

  useEffect(() => {
    const timer = setInterval(() => {
      let left = calculateTimeLeft();
      if (left <= 0) {
        clearTimeout(timer);
        if (doc.phase === "question" && context.isTeacher) {
          actions?.showAnswerAndScore(context, doc, params);
        }
      }
      left = left <= 0 ? 0 : left;
      setTimeLeft(left);
    }, 200);

    return () => clearTimeout(timer);
  });

  const currQuestion =
    params.questions.params.choices[doc.currentQuestionNumber];

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
              doc.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(a)
              ) -
              doc.currentQuestionOrder.indexOf(currQuestion.answers.indexOf(b))
            );
          })
          .map((q, index) => (
            <Box
              border={{
                size: "3px",
                color:
                  doc.phase === "question" ||
                  (doc.phase === "review" &&
                    currQuestion.answers.indexOf(q) !== 0)
                    ? "transparent"
                    : undefined,
              }}
              margin="small"
              round
              align="center"
              background={{
                color:
                  doc.phase === "review" &&
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
                {doc.phase === "review" && (
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
                          doc.answers[doc.currentQuestionNumber]
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
          {"Question "} {doc.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Text margin="medium">
          {"Given answers: "}
          {Object.keys(doc.answers[doc.currentQuestionNumber]).length}
        </Text>
        {doc.phase === "question" && (
          <Box margin="medium">
            <Timer left={timeLeft} max={maxTime} />
          </Box>
        )}
        {doc.phase === "question" && (
          <Button
            margin="medium"
            label="Show answer"
            onClick={() => {
              actions?.showAnswerAndScore(context, doc, params);
            }}
          />
        )}
        {doc.phase === "review" && (
          <Button
            margin="medium"
            label="Show scores"
            onClick={() => {
              actions?.showScores(context, doc, params);
            }}
          />
        )}
      </Box>
    </Box>
  ) : doc.phase === "question" ? (
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
              doc.currentQuestionOrder.indexOf(
                currQuestion.answers.indexOf(b)
              ) -
              doc.currentQuestionOrder.indexOf(currQuestion.answers.indexOf(a))
          )
          .map((q, index) => (
            <Box margin="small" height="6em" key={index}>
              <Button
                key={q}
                disabled={
                  doc.answers[doc.currentQuestionNumber] !== undefined &&
                  doc.answers[doc.currentQuestionNumber][context.userId] !==
                    undefined &&
                  doc.answers[doc.currentQuestionNumber][context.userId] !==
                    doc.currentQuestionOrder[index]
                }
                label={<Text size="xlarge">{icons[index]}</Text>}
                color={colors[index]}
                primary
                fill
                onClick={() => {
                  actions?.answer(
                    context,
                    doc,
                    params,
                    doc.currentQuestionOrder[index]
                  );
                }}
              ></Button>
            </Box>
          ))}
      </Grid>
      <Box direction="row" justify="between">
        <Text margin="medium">
          {"Question "} {doc.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Box margin="medium">
          <Timer left={timeLeft} max={maxTime} />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>
      <Box
        margin="medium"
        round
        height="12em"
        background={
          doc.answers[doc.currentQuestionNumber][context.userId] === 0
            ? "status-ok"
            : "status-error"
        }
      >
        <Box fill align="center" justify="center">
          <FontAwesomeIcon
            color="white"
            size="4x"
            icon={
              doc.answers[doc.currentQuestionNumber][context.userId] === 0
                ? faCheck
                : faTimes
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

preview(Question, {
  "teacher-unanswered": {
    context: teacherContext,
    doc: {
      ...sampleDoc,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
    },
    params: sampleParams,
  },
  "teacher-review": {
    context: teacherContext,
    doc: {
      ...sampleDoc,
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
    doc: {
      ...sampleDoc,
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
    doc: {
      ...sampleDoc,
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
    doc: {
      ...sampleDoc,
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
    doc: {
      ...sampleDoc,
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
    },
    params: sampleParams,
  },
});
