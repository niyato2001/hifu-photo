import Image, { StaticImageData } from 'next/image';

export interface PageMainPresenterProps {
  imageFiles: StaticImageData[];
  handleLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //fileButton: ButtonProps;
  // readButton: ButtonProps;
  // renameButton: ButtonProps;
}

export const baseId = 'common-template-page-main';

export const PageMain: React.FC<PageMainPresenterProps> = ({
  imageFiles,
  handleLoad,
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
      <button className='btn-file btn relative inline-block max-w-fit '>
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
        <Image alt='' src={image} width={100} height={100} />
      </div>
    ))}
  </>
);
