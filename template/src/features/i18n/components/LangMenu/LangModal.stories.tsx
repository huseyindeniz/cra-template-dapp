// ConnectButton.stories.ts|tsx
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LangModal } from "./LangModal";

export default {
  title: "i18n/LangModal",
  component: LangModal,
  args: {
    defaultValue: "en-US",
    isOpen: true,
    onChange: () => null,
    onClose: () => null,
    supportedLanguages: [
      {
        code: "en-US",
        label: "English (US)",
      },
      {
        code: "tr-TR",
        label: "Türkçe",
      },
    ],
  },
} as ComponentMeta<typeof LangModal>;

export const Default: ComponentStory<typeof LangModal> = (args) => (
  <LangModal {...args} />
);
