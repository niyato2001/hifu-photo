import { PageMain as PageMainPresenter } from './PageMain';
import { propObj, PageMainDataProps } from './PageMain.props';

export interface PageMainLogicProps {
  handleLoad: () => void;
}

const handleLoad = (): void => {
  console.log('hello dermatologist!');
};
const logicObj: PageMainLogicProps = {
  handleLoad: handleLoad,
};

const PageMain: React.FC = () => {
  const defaultProps: PageMainDataProps = { ...propObj.default };
  return <PageMainPresenter {...defaultProps} {...logicObj} />;
};

export { PageMain, logicObj };
