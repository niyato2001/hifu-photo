import Image, { StaticImageData } from 'next/image';
import { PageMainLogicProps } from '.';

export interface PageMainPresenterProps extends PageMainLogicProps {
  imageFiles: StaticImageData[];
  //fileButton: ButtonProps;
  // readButton: ButtonProps;
  // renameButton: ButtonProps;
}

export const baseId = 'common-template-page-main';

export const PageMain: React.FC<PageMainPresenterProps> = ({
  imageFiles,
  handleLoad,
  loadImages,
  readImages,
  readCode,
  //  fileButton,
  // readButton,
  // renameButton,
}) => (
  <>
    <h1 className='text-center text-2xl font-bold text-black'>皮膚科専攻医の写真整理を DX する</h1>
    <div className='my-10 mx-auto flex w-80 flex-col gap-10'>
      {/* <button
        onClick={
          handleLoad
          // () => console.log('hello')
        }
        className='btn-file btn'
      >
        画像ファイルを選択
      </button> */}
      {/* inputを包含したbuttonでファイルを選択できたらhandleLoadを作動 */}
      <button className='btn-file btn relative mx-auto inline-block max-w-fit'>
        画像ファイルを選択
        <input
          type='file'
          className='absolute left-0 top-0 h-full w-full cursor-pointer opacity-0'
          multiple
          onChange={handleLoad}
        />
      </button>
      {/* <Button {...readButton} />
      <Button {...renameButton} /> */}
    </div>
    {imageFiles.map((image, i) => (
      <div key={i}>
        <Image alt='' src={image} width={100} height={35} />
      </div>
    ))}
    <div className='flex'>
      {loadImages
        ? loadImages.map((image, i) => (
            <div key={i} className='flex-row items-center justify-center'>
              <Image alt='' src={image.url} width={200} height={200} />
              <p>{image.image.name}</p>
              <p>{new Date(image.image.lastModified).toDateString()}</p>
            </div>
          ))
        : null}
      {readImages
        ? readImages.map((image, i) => (
            <div key={i} className='flex-row items-center justify-center'>
              <Image alt='' src={image.url} width={200} height={200} />
              <p>{image.image.name}</p>
              <p>{new Date(image.image.lastModified).toDateString()}</p>
              <span>
                結果
                <p>{image.decode}</p>
              </span>
            </div>
          ))
        : null}
    </div>
    <div className='my-10 mx-auto flex w-80 flex-col gap-10'>
      <button className='btn-file btn  mx-auto' onClick={readCode}>
        バーコードを読み取る
      </button>
    </div>
  </>
);
