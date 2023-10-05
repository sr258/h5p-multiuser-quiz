import type { Meta, StoryObj } from "@storybook/react";

import { Scores } from "../scripts/components/Scores";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";
import { teacherContext } from "./testData/teacherContext";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Scores",
  component: Scores,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Scores>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Teacher: Story = {
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
export const Student: Story = {
  args: {
    context: {
      userId: "user3",
      isTeacher: false,
      displayName: "Real Name 3",
    },
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
export const StudentNoScore: Story = {
  args: {
    context: {
      userId: "user1",
      isTeacher: false,
      displayName: "Real Name 3",
    },
    state: {
      ...sampleState,
      phase: "scores",
    },
    params: sampleParams,
  },
};
