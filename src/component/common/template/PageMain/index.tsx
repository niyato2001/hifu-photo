import { useState } from 'react';
import { PageMain as PageMainPresenter } from './PageMain';
import { propObj, PageMainDataProps } from './PageMain.props';
import { downloadImages } from '@/lib/downloadImages';
import { scanCode } from '@/lib/scan';

export interface PageMainLogicProps {
  handleLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadImages: LoadFileProps[];
  readImages: ReadImageProps[];
  readCode: () => Promise<void>;
  renameImage: () => Promise<void>;
}

interface LoadFileProps {
  image: File;
  url: string;
}

interface ReadImageProps {
  image: File;
  url: string;
  decode: string;
}

const PageMain: React.FC = () => {
  const [images, setImage] = useState<File[]>([]);
  const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);
  const [loadImages, setLoadImages] = useState<LoadFileProps[]>([]);
  const [readImages, setReadImages] = useState<ReadImageProps[]>([]);
  console.log('全体がレンダリングされています');

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('hello dermatologist!');
    if (event.target.files) {
      //FileList形式で画像ファイルをローカルストレージから読み込み
      const fileList = event.target.files;
      //読み込んだファイルをFlie[]に型を変更して配列にする
      const files: File[] = [...Array.from(fileList)];
      //imagesを展開してあたらしい画像ファイルの配列を作成し、読み込んだファイルを入れる
      const list = [...images];
      list.push(...files);
      //画像ファイルの配列をimagesに追加し状態変更。状態変更はレンダリング時に非同期におこなわれる。
      console.log('画像ファイルが追加されたlist', list);
      setImage(list);
      //imagesはすぐに変わらない
      console.log('更新されていないのimages', images);
      //createObjectURLを展開してあたらしいＵＲＬの配列を作成
      const urlList = [...createObjectURL];
      list.map((file) => urlList.push(URL.createObjectURL(file)));
      //URLの配列をcreateObjURLに追加し状態変更。状態変更はレンダリング時に非同期におこなわれる。
      console.log('URLが追加されたurlList', urlList);
      setCreateObjectURL(urlList);
      //createObjectURLはすぐには変わらない
      console.log('更新されていないcreateObjectURL', createObjectURL);
      //listとurlListを合わせたオブジェクト配列を作成しloadImagesの状態変更
      const loadList: LoadFileProps[] = list.map((file, i) => ({
        image: list[i],
        url: urlList[i],
      }));
      console.log('ファイルとURLが合わさった配列', loadList);
      setLoadImages(loadList);
      //loadImagesはすぐにはかわらない
    } else return;
  };
  // await ではなく then を使うとこんな書き方。 readCode を async にしなくてもよくなる。
  // const readCode = (): void => {
  //   if (!createObjectURL) {
  //     return;
  //   } else {
  //     console.log('ここでは追加されている', createObjectURL);
  //     const list = [...images];
  //     scanCode(createObjectURL).then((val) => {
  //       console.log('val', val);
  //       const newDecode = val;
  //       console.log('これはだめなのか', images);
  //       const newReadImages: ReadImageProps[] = list.map((file, i) => ({
  //         image: list[i],
  //         url: createObjectURL[i],
  //         decode: newDecode[i],
  //       }));
  //       console.log('これはだめなのか２', newDecode);
  //       console.log('decodeできてる？', newReadImages);
  //       setReadImages(newReadImages);
  //     });
  //   }
  // };

  const readCode = async (): Promise<void> => {
    if (!createObjectURL) {
      return;
    } else {
      console.log(
        'バーコード読み取り時点ではすでに blob は追加されていることを確認',
        createObjectURL,
      );
      //imagesを展開してあたらしい画像ファイルの配列を作成
      const list = [...images];
      //await を使って scanCode の処理で 読み込んだバーコードの配列を val に取得
      const val = await scanCode(createObjectURL);
      console.log('読み込んだバーコードの配列', val);
      const newDecode = val;
      const newReadImages: ReadImageProps[] = list.map((file, i) => ({
        image: list[i],
        url: createObjectURL[i],
        decode: newDecode[i],
      }));
      console.log('File, blob, 読み込んだコードの Obj の配列', newReadImages);
      setReadImages(newReadImages);
    }
  };
  const renameImage = async (): Promise<void> => {
    const newDownloadImages = readImages.map((image, i) => ({
      url: readImages[i].url,
      filename: readImages[i].decode,
    }));
    await downloadImages(newDownloadImages);
  };

  const logicObj: PageMainLogicProps = {
    handleLoad: handleLoad,
    loadImages: loadImages,
    readImages: readImages,
    readCode: readCode,
    renameImage: renameImage,
  };
  const defaultProps: PageMainDataProps = { ...propObj.default };
  return <PageMainPresenter {...defaultProps} {...logicObj} />;
};

export { PageMain };
