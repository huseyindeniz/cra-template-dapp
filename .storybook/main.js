const config = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@chakra-ui/storybook-addon",],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  "core": {},
  docs: {
    autodocs: false
  }
};
export default config;
export const framework = "@storybook/react";