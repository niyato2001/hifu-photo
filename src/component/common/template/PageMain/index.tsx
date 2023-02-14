import { PageMain as PageMainPresenter, PageMainProps } from './PageMain';
import { propObj } from './PageMain.props';

const PageMain: React.FC = () => {
  const defaultProps: PageMainProps = { ...propObj.default };
  return <PageMainPresenter {...defaultProps} />;
};

export { PageMain };
