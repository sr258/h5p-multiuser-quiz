import type { Meta, StoryObj } from "@storybook/react";

import { FinalScoresTeacher } from "../scripts/screens/FinalScoresTeacher";

import { sampleState } from "./testData/sampleState";
import { sampleParams } from "./testData/sampleParams";
import { teacherContext } from "./testData/teacherContext";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Final Scores Teacher",
  component: FinalScoresTeacher,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof FinalScoresTeacher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    context: teacherContext,
    state: {
      ...sampleState,
      phase: "scores",
      scores: {
        user1: 1000,
        user2: 5000,
        user3: 2500,
        user4: 9000,
        user5: 10000,
      },
    },
    params: sampleParams,
  },
};