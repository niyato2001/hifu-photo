export interface PageMainProps {
  title: string;
  //fileButton: ButtonProps;
  // readButton: ButtonProps;
  // renameButton: ButtonProps;
}

export const baseId = 'common-template-page-main';

export const PageMain: React.FC<PageMainProps> = ({
  title,
  //  fileButton,
  // readButton,
  // renameButton,
}) => (
  <>
    <h1 className='text-center text-2xl font-bold text-black'>{title}</h1>
    <div className='my-10 mx-auto flex w-80 flex-col gap-10'>
      <button onClick={() => console.log('hello')} className={`btn-file btn`}>
        画像ファイルを選択
      </button>
      {/* <Button {...readButton} />
      <Button {...renameButton} /> */}
    </div>
  </>
);
