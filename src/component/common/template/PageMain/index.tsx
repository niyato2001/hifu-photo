import { useState } from 'react';
import { PageMain as PageMainPresenter } from './PageMain';
import { propObj, PageMainDataProps } from './PageMain.props';

export interface PageMainLogicProps {
  handleLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PageMain: React.FC = () => {
  const [images, setImage] = useState<File[]>([]);
  const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);
  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('hello dermatologist!');
    if (event.target.files) {
      const fileList = event.target.files;
      const files: File[] = [...Array.from(fileList)];

      const list = [...images];
      list.push(...files);

      setImage(list);
      console.log(list);

      const urlList = [...createObjectURL];

      files.map((file) => urlList.push(URL.createObjectURL(file)));

      setCreateObjectURL(urlList);
      console.log(urlList);
    }
  };
  const logicObj: PageMainLogicProps = {
    handleLoad: handleLoad,
  };
  const defaultProps: PageMainDataProps = { ...propObj.default };
  return <PageMainPresenter {...defaultProps} {...logicObj} />;
};

export { PageMain };
