import React from "react";
import type { Preview } from "@storybook/react";
import { Grommet } from "grommet";
import { L10nContext } from "use-h5p";
import semantics from "../semantics.json";

const myTheme = {
  global: {
    font: {
      family: "Sans",
    },
  },
};

const l10nParams = (
  semantics.find((e) => e.name == "l10n") as any
)?.fields.reduce((p, c) => {
  p[c.name] = c.default;
  return p;
}, {});

const preview: Preview = {
  decorators: [
    (Story) => (
      <Grommet theme={myTheme}>
        <L10nContext.Provider value={l10nParams}>
          <Story />
        </L10nContext.Provider>
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
