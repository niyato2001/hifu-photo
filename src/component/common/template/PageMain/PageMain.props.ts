import { PageMainProps } from './PageMain';
// import { propObj as buttonProps } from '@/component/common/part/Button/Button.props';

const defaultProps: PageMainProps = {
  title: '皮膚科専攻医の写真整理を DX する',
  // fileButton: buttonProps.file,
  // readButton: buttonProps.read,
  // renameButton: buttonProps.rename,
};

export const propObj: { [key: string]: PageMainProps } = {
  default: defaultProps,
};
