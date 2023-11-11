import type { Meta, StoryObj } from "@storybook/react";

import { QuestionTeacher } from "../screens/QuestionTeacher";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";
import { teacherContext } from "./testData/teacherContext";
import { sampleUsers } from "./testData/sampleUsers";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Screens/Question/Teacher",
  component: QuestionTeacher,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof QuestionTeacher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unanswered: Story = {
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
    users: sampleUsers,
  },
};
export const Review: Story = {
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
    users: sampleUsers,
  },
};
