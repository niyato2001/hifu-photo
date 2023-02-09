import { render, screen } from '@testing-library/react';
import { PageMain, PageMainProps, baseId } from './PageMain';
import { propObj} from './PageMain.props';

let props: PageMainProps;

describe('default', () => {
  beforeEach(() => {
    props = propObj.default;
  });

  it('default のテストケースを書くこと', () => {
    render(<PageMain {...props} />);
    expect(screen.getByTestId(baseId)).toBeInTheDocument();
  });
});