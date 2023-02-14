import { ButtonProps } from './';

const inqueryProps: ButtonProps = {
  // onClick:()=>,
  type: 'btn-inquery',
  name: 'お問い合わせ',
};
const fileProps: ButtonProps = {
  // onClick:()=>,
  type: 'btn-file',
  name: '画像ファイルを選択',
};

/**
 * const propObj への補足。
 * propObj の中身が3つ以上になる場合、以下のように書くと便利です。
 * 使わないときはこのコメントアウト部分は削除してください。
 */
/*interface PropObj {
  default: ButtonProps;
  pattern1(適宜名称を変えてください): ButtonProps;
  pattern2: ButtonProps;
  ...
}
export const propObj: PropObj = {
  default: defaultProps,
    pattern1(適宜名称を変えてください): pattern1Props;
  pattern2: pattern2Props;
  ...
}*/

export const propObj: { [key: string]: ButtonProps } = {
  inquery: inqueryProps,
  file: fileProps,
};
