import type { Meta, StoryObj } from "@storybook/react";

import { Main } from "../scripts/screens/Main";

import { sampleParams } from "./testData/sampleParams";
import { sampleState } from "./testData/sampleState";
import { teacherContext } from "./testData/teacherContext";
import { sampleMetadata } from "./testData/sampleMetadata";
import { sampleUsers, sampleUsersMany } from "./testData/sampleUsers";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Main",
  component: Main,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Connecting: Story = {
  args: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    metadata: sampleMetadata,
    users: [],
  },
};
export const Deleted: Story = {
  args: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    deleted: true,
    metadata: sampleMetadata,
    users: [],
  },
};
export const Error: Story = {
  args: {
    context: teacherContext,
    state: undefined,
    params: sampleParams,
    error: "Some weird error message",
    metadata: sampleMetadata,
    users: [],
  },
};
export const PreparingTeacherNoStudents: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
    users: [],
  },
};
export const PreparingTeacher: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
    users: sampleUsers,
  },
};
export const PreparingTeacherManyStudents: Story = {
  args: {
    context: teacherContext,
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
    users: sampleUsersMany,
  },
};

export const PreparingStudent: Story = {
  args: {
    context: {
      displayName: "Student",
      isTeacher: false,
      userId: "student",
    },
    state: sampleState,
    params: sampleParams,
    metadata: sampleMetadata,
    users: sampleUsers,
  },
};
