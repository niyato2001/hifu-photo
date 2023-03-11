import { StaticImageData } from 'next/image';
import SampleImage from '~/img/fwywd.png';
// import { propObj as buttonProps } from '@/component/common/part/Button/Button.props';

export interface PageMainDataProps {
  imageFiles: StaticImageData[];
}

// SampleImage.name = 'sample';
// SampleImage.time = '2/13';
// SampleImage.isRead = false;
// SampleImage.isCode = false;
// SampleImage.readeContent = '';

const defaultProps: PageMainDataProps = {
  imageFiles: [SampleImage],
  // fileButton: buttonProps.file,
  // readButton: buttonProps.read,
  // renameButton: buttonProps.rename,
};

export const propObj: { [key: string]: PageMainDataProps } = {
  default: defaultProps,
};
