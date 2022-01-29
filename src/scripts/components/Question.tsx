import { preview } from "@reactpreview/config";
import { Box, Text, Heading, Button, Grid } from "grommet";
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

import { sampleParams } from "../sampleParams";
import { IParams, IState, IContext } from "../types";

const colors = [
  "neutral-1",
  "neutral-2",
  "neutral-3",
  "neutral-4",
  "accent-1",
  "accent-2",
  "accent-3",
  "accent-4",
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

export const Question = ({
  context,
  params,
  doc,
}: {
  context: IContext;
  params: IParams;
  doc: IState;
}) => {
  const currQuestion =
    params.questions.params.choices[doc.currentQuestionNumber];

  return context.isTeacher ? (
    <Box>
      <Heading textAlign="center">
        <span
          dangerouslySetInnerHTML={{
            __html: currQuestion.question,
          }}
        ></span>
      </Heading>
      <Box>
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
              margin="small"
              round
              align="center"
              style={{
                opacity:
                  doc.phase === "review" &&
                  currQuestion.answers.indexOf(q) !== 0
                    ? 0.3
                    : undefined,
              }}
              background={{ color: colors[index] }}
            >
              <Box direction="row" align="center">
                <Box margin="medium">{icons[index]}</Box>
                <Box>
                  {<span dangerouslySetInnerHTML={{ __html: q }}></span>}
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
      <Box direction="row" justify="between">
        <Text margin="medium">
          {"Question "} {doc.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Text margin="medium">
          {"Given answers: "}
          {Object.keys(doc.answers[doc.currentQuestionNumber]).length}
        </Text>
        {doc.phase === "question" && (
          <Text margin="medium">
            {"Time left: "}
            {Math.round(
              (20000 - (Date.now() - doc.currentQuestionStart)) / 1000
            )}
            {"s"}
          </Text>
        )}
        {doc.phase === "question" && (
          <Button margin="medium" label="Show answer" />
        )}
        {doc.phase === "review" && (
          <Button margin="medium" label="Show scores" />
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
            <Box margin="small" height="6em">
              <Button
                disabled={
                  doc.answers[doc.currentQuestionNumber][context.userId] !==
                    undefined &&
                  doc.answers[doc.currentQuestionNumber][context.userId] !==
                    index
                }
                label={icons[index]}
                color={colors[index]}
                primary
                fill
              ></Button>
            </Box>
          ))}
      </Grid>
      <Box direction="row" justify="between">
        <Text margin="medium">
          {"Question "} {doc.currentQuestionNumber + 1} /{" "}
          {params.questions.params.choices.length}
        </Text>
        <Text margin="medium">
          {"Time left: "}
          {Math.round((20000 - (Date.now() - doc.currentQuestionStart)) / 1000)}
          {"s"}
        </Text>
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
    context: {
      userId: "teacher",
      isTeacher: true,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
      scores: {},
    },
    params: sampleParams,
  },
  "teacher-review": {
    context: {
      userId: "teacher",
      isTeacher: true,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
      scores: {},
    },
    params: sampleParams,
  },
  "student-unanswered": {
    context: {
      userId: "user4",
      isTeacher: false,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
      scores: {},
    },
    params: sampleParams,
  },
  "student-answered": {
    context: {
      userId: "user1",
      isTeacher: false,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "question",
      scores: {},
    },
    params: sampleParams,
  },
  "student-review-correct": {
    context: {
      userId: "user1",
      isTeacher: false,
    },
    doc: {
      answers: [{ user1: 0, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
      scores: {},
    },
    params: sampleParams,
  },
  "student-review-wrong": {
    context: {
      userId: "user1",
      isTeacher: false,
    },
    doc: {
      answers: [{ user1: 1, user2: 2, user3: 1 }],
      currentQuestionOrder: [1, 2, 3, 0],
      currentQuestionNumber: 0,
      currentQuestionStart: Date.now() - 8547,
      phase: "review",
      scores: {},
    },
    params: sampleParams,
  },
});
