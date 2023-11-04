import type { Meta, StoryObj } from "@storybook/react";

import { PreparingStudent } from "../scripts/screens/PreparingStudent";
import { sampleMetadata } from "./testData/sampleMetadata";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Preparing Student",
  component: PreparingStudent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof PreparingStudent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metadata: sampleMetadata,
  },
};
