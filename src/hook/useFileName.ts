import { useState, Dispatch, SetStateAction } from 'react';

export interface UseFileNameReturntype {
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
}

export const useFileName = (): UseFileNameReturntype => {
  const [fileName, setFileName] = useState<string>('');
  return { fileName, setFileName };
};
