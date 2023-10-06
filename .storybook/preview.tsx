import React from "react";

import type { Preview } from "@storybook/react";
import { Grommet } from "grommet";

const myTheme = {
  global: {
    font: {
      family: 'Sans',
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <Grommet theme={myTheme}>
        <Story />
      </Grommet>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
