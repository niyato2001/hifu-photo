import { render, screen } from '@testing-library/react';
import { propObj } from './Button.props';
import { Button, ButtonProps, baseId } from './';

let props: ButtonProps;

describe('inquery', () => {
  beforeEach(() => {
    props = propObj.inquery;
  });

  it('inquery の テキストが正しく表示されること', () => {
    render(<Button {...props} />);
    expect(screen.getByTestId(baseId)).toHaveTextContent(props.name);
  });
});
