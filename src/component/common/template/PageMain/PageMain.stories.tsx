import type { ComponentMeta, Story } from '@storybook/react';
import { PageMain, PageMainProps } from './PageMain';
import { propObj } from './PageMain.props';

export default {
  title: 'Common/template/PageMain',
  component: PageMain,
} as ComponentMeta<typeof PageMain>;

const Template: Story<PageMainProps> = (args) => <PageMain {...args} />;

export const Default = Template.bind({});
Default.args = propObj.default;
