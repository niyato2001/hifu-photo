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

interface GroupImageProps {
  url: string;
  filename: string;
}

export interface IdImageProps {
  id: string;
  groupImages: GroupImageProps[];
}

const PageMain: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loadImages, setLoadImages] = useState<LoadFileProps[]>([]);
  const [readImages, setReadImages] = useState<ReadImageProps[]>([]);
  console.log('全体がレンダリングされています');
  console.log(images, imageUrls, loadImages, readImages);
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
      setImages(list);
      //imagesはすぐに変わらない
      console.log('更新されていないのimages', images);
      //imageUrlsを展開してあたらしいＵＲＬの配列を作成
      const urlList = [...imageUrls];
      list.map((file) => urlList.push(URL.createObjectURL(file)));
      //Urlsの配列をimageUrlsに追加し状態変更。状態変更はレンダリング時に非同期におこなわれる。
      console.log('Urlsが追加されたurlList', urlList);
      setImageUrls(urlList);
      //imageUrlsはすぐには変わらない
      console.log('更新されていないimageUrls', imageUrls);
      //listとurlListを合わせたオブジェクト配列を作成しloadImagesの状態変更
      const loadList: LoadFileProps[] = list.map((file, i) => ({
        image: list[i],
        url: urlList[i],
      }));
      console.log('ファイルとUrlsが合わさった配列', loadList);
      setLoadImages(loadList);
      //loadImagesはすぐにはかわらない
    } else return;
  };
  // await ではなく then を使うとこんな書き方。 readCode を async にしなくてもよくなる。
  // const readCode = (): void => {
  //   if (!imageUrls) {
  //     return;
  //   } else {
  //     console.log('ここでは追加されている', imageUrls);
  //     const list = [...images];
  //     scanCode(imageUrls).then((val) => {
  //       console.log('val', val);
  //       const newDecode = val;
  //       console.log('これはだめなのか', images);
  //       const newReadImages: ReadImageProps[] = list.map((file, i) => ({
  //         image: list[i],
  //         url: imageUrls[i],
  //         decode: newDecode[i],
  //       }));
  //       console.log('これはだめなのか２', newDecode);
  //       console.log('decodeできてる？', newReadImages);
  //       setReadImages(newReadImages);
  //     });
  //   }
  // };

  const readCode = async (): Promise<void> => {
    if (!imageUrls) {
      return;
    } else {
      console.log('バーコード読み取り時点ではすでに blob は追加されていることを確認', imageUrls);
      //imagesを展開してあたらしい画像ファイルの配列を作成
      const list = [...loadImages];
      //await を使って scanCode の処理で 読み込んだバーコードの配列を val に取得
      const val = await scanCode(list.map((obj) => obj.url));
      console.log('読み込んだバーコードの配列', val);
      const newDecode = val;
      const newReadImages: ReadImageProps[] = list.map((file, i) => ({
        ...list[i],
        decode: newDecode[i],
      }));
      console.log('File, blob, 読み込んだコードの Obj の配列', newReadImages);
      setReadImages(newReadImages);
    }
  };
  const renameImage = async (): Promise<void> => {
    if (!readImages) {
      return;
    } else {
      const newDownloadImages: GroupImageProps[] = readImages.map((image, i) => ({
        url: readImages[i].url,
        filename: readImages[i].decode,
      }));
      //ここでdecodeごとで区切った配列{id:string,groupImages:{url,filename}[]}[]
      const initialIdImages: IdImageProps[] = [];
      const decodeIndex: number[] = [];
      //newDownloadImagesでfilenameがidであるもののindexを取得
      newDownloadImages.forEach((image, i) => {
        if (image.filename !== 'not detected') {
          decodeIndex.push(i);
        } else {
          return;
        }
      });
      //idごとに区切ったobjを作成{id:string,groupImages:{url,filename}[]}
      decodeIndex.forEach((index, i) => {
        // if (i !== decodeIndex.length - 1) {
        //decodeIndexで最後以外の場合
        initialIdImages.push({
          id: newDownloadImages[index].filename,
          //newDownloadImagesからindex番目から次のindexの一つ手前までの要素を取り出す
          //最後はslice(last,last+1)となるが、slice(last)と同義なのでOK?
          groupImages: newDownloadImages.slice(index, decodeIndex[i + 1]),
        });
        // } else {
        //   //decodeIndexで最後の場合、decodeIndex[i+1]がundefinedとなる可能性がある。上記でもいけるかもしれないので後で試す（上記のみでいける。）
        //   initialIdImages.push({
        //     id: newDownloadImages[index].filename,
        //     //newDownloadImagesからindex番目から次のindexの一つ手前までの要素を取り出す
        //     //最後はslice(last,last+1)となるが、slice(last)と同義なのでOK?
        //     groupImages: newDownloadImages.slice(index),
        //   });
        // }
      });
      //この時点でinitialIdImagesはdecodeしたIDごとで区切った配列になっているはず
      //initialIdImagesはstateの方がよい説あり。
      await downloadImages(initialIdImages);
      setImages([]);
      setImageUrls([]);
      setLoadImages([]);
      setReadImages([]);
      console.log('レンダリング前なので、まだ情報あり', images, imageUrls, loadImages, readImages);
    }
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
