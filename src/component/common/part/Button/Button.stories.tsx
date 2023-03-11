import type { ComponentMeta, Story } from '@storybook/react';
import { Button, ButtonProps } from './';

export default {
  title: 'Common/part/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const File = Template.bind({});
File.args = {
  children: <button className={`btn-file btn`}>画像ファイルを選択</button>,
};
export const Inquery = Template.bind({});
Inquery.args = {
  children: (
    <a href=''>
      <button className={`btn-inquery btn`}>お問い合わせ</button>
    </a>
  ),
};
