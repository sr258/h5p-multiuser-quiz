import type { Meta, StoryObj } from "@storybook/react";

import { FinalScoresStudent } from "../scripts/screens/FinalScoresStudent";

import { sampleState } from "./testData/sampleState";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Screens/Final Scores/Student",
  component: FinalScoresStudent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof FinalScoresStudent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoWinner: Story = {
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
  },
};

export const Winner: Story = {
  args: {
    context: {
      userId: "user5",
      isTeacher: false,
      displayName: "Real Name 5",
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
  },
};

export const Second: Story = {
  args: {
    context: {
      userId: "user4",
      isTeacher: false,
      displayName: "Real Name 4",
    },
    state: Winner.args.state,
  },
};

export const Third: Story = {
  args: {
    context: {
      userId: "user2",
      isTeacher: false,
      displayName: "Real Name 2",
    },
    state: Winner.args.state,
  },
};

export const NoScore: Story = {
  args: {
    context: {
      userId: "user5",
      isTeacher: false,
      displayName: "Real Name 5",
    },
    state: {
      ...sampleState,
      phase: "scores",
    },
  },
};
