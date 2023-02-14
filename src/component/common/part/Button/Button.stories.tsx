import type { ComponentMeta, Story } from '@storybook/react';
import { propObj } from './Button.props';
import { Button, ButtonProps } from './';

export default {
  title: 'Common/part/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const File = Template.bind({});
File.args = propObj.file;
export const Inquery = Template.bind({});
Inquery.args = propObj.inquery;
