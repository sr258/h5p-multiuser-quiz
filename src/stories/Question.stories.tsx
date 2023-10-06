import type { Meta, StoryObj } from "@storybook/react";

import { Question } from "../scripts/components/Question";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";
import { teacherContext } from "./testData/teacherContext";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Question",
  component: Question,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Question>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeacherUnanswered: Story = {
  args: {
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
};
export const TeacherReview: Story = {
  args: {
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
};
export const StudentUnanswered: Story = {
  args: {
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
};
export const StudentAnswered: Story = {
  args: {
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
};
export const StudentReviewCorrect: Story = {
  args: {
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
};
export const StudentReviewWrong: Story = {
  args: {
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
};
export const StudentReviewNoAnswer: Story = {
  args: {
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
};
