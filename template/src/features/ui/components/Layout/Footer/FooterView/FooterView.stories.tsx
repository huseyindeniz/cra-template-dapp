import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FooterView } from './FooterView';

export default {
  title: 'ui/Components/Layout/Footer/FooterView',
  component: FooterView,
} as ComponentMeta<typeof FooterView>;

const Template: ComponentStory<typeof FooterView> = args => (
  <FooterView {...args} />
);

export const Default = Template.bind({});
Default.args = {
  firstRowContent: <div>First row content</div>,
  secondRowContent: <div>Second row content</div>,
};

export const OnlyFirstRow = Template.bind({});
OnlyFirstRow.args = {
  firstRowContent: <div>Only first row content</div>,
};

export const OnlySecondRow = Template.bind({});
OnlySecondRow.args = {
  secondRowContent: <div>Only second row content</div>,
};
