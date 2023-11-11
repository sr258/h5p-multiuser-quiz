import type { Meta, StoryObj } from "@storybook/react";

import { QuestionStudent } from "../screens/QuestionStudent";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Screens/Question/Student",
  component: QuestionStudent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof QuestionStudent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unanswered: Story = {
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
export const Answered: Story = {
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
export const ReviewCorrect: Story = {
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
export const ReviewWrong: Story = {
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
export const ReviewNoAnswer: Story = {
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
