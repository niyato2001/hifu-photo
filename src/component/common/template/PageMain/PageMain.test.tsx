import { render } from '@testing-library/react';
import { PageMain } from './PageMain';
import { propObj as presenterObj, PageMainDataProps } from './PageMain.props';
import { logicObj, PageMainLogicProps } from './';

let presenterProps: PageMainDataProps;
let logicProps: PageMainLogicProps;

describe('default', () => {
  beforeEach(() => {
    presenterProps = presenterObj.default;
    logicProps = logicObj;
  });

  it('default のテストケースを書くこと', () => {
    render(<PageMain {...presenterProps} {...logicProps} />);
    expect(true).toBe(true);
  });
});
