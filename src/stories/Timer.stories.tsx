import type { Meta, StoryObj } from "@storybook/react";

import { Timer } from "../components/Timer";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Timer",
  component: Timer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Half: Story = {
  args: {
    left: 10,
    max: 20,
  },
};

export const End: Story = {
  args: {
    left: 0,
    max: 20,
  },
};

export const Start: Story = {
  args: {
    left: 20,
    max: 20,
  },
};

export const NearlyEnd: Story = {
  args: {
    left: 3,
    max: 20,
  },
};
