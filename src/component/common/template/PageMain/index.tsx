import { useState } from 'react';
import { PageMain as PageMainPresenter } from './PageMain';
import { propObj, PageMainDataProps } from './PageMain.props';

export interface PageMainLogicProps {
  handleLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadImages: LoadFileProps[];
}

interface LoadFileProps {
  image: File;
  url: string;
}

const PageMain: React.FC = () => {
  const [images, setImage] = useState<File[]>([]);
  const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);
  const [loadImages, setLoadImages] = useState<LoadFileProps[]>([]);
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
      const loadList: LoadFileProps[] = list.map((file, i) => ({
        image: list[i],
        url: urlList[i],
      }));
      setLoadImages(loadList);
      console.log(loadList);
    }
  };
  const logicObj: PageMainLogicProps = {
    handleLoad: handleLoad,
    loadImages: loadImages,
  };
  const defaultProps: PageMainDataProps = { ...propObj.default };
  return <PageMainPresenter {...defaultProps} {...logicObj} />;
};

export { PageMain };
