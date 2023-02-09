import { PageMain as PageMainPresenter, PageMainProps } from './PageMain';

/**
 * ロジックが存在しない（= Container が要らない）場合は 以下と置き換えてください。
 * 存在する場合はコメントアウト部分を全て削除して使ってください。
 */
/* 
export type { PageMainProps };
export { PageMainPresenter};
*/

const PageMain: React.FC = () => {
  const defaultProps: PageMainProps = {};
  return <PageMainPresenter {...defaultProps} />;
};

export { PageMain };
