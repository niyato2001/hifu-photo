import { ImageProps } from 'next/image';
import { useState, Dispatch, SetStateAction } from 'react';

export interface ImageFileProps extends ImageProps {
  name: string;
  time: string;
  isRead: boolean;
  isCode: boolean;
  readContent: string;
}

interface UseImageFilesReturnType {
  imageFiles: ImageFileProps[];
  setImageFiles: Dispatch<SetStateAction<ImageFileProps[]>>;
}

export const useImageFiles = (): UseImageFilesReturnType => {
  const [imageFiles, setImageFiles] = useState<ImageFileProps[]>([]);
  return { imageFiles, setImageFiles };
};
