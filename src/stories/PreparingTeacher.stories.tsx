import type { Meta, StoryObj } from "@storybook/react";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";
import { teacherContext } from "./testData/teacherContext";
import { sampleMetadata } from "./testData/sampleMetadata";
import { sampleUsers, sampleUsersMany } from "./testData/sampleUsers";
import { PreparingTeacher } from "../scripts/screens/PreparingTeacher";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Preparing Teacher",
  component: PreparingTeacher,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof PreparingTeacher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoStudent: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    users: [],
    metadata: sampleMetadata,
  },
};
export const SomeStudents: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    users: sampleUsers,
    metadata: sampleMetadata,
  },
};
export const ManyStudents: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    users: sampleUsersMany,
    metadata: sampleMetadata,
  },
};
