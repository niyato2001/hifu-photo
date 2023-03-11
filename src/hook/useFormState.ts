import { useState, Dispatch, SetStateAction } from 'react';
import { ImageFileProps } from '@/hook/useImageFiles';

interface UseFormStateReturnType {
  setFormState: Dispatch<SetStateAction<ImageFileProps>>;
  formState: ImageFileProps;
  initialForm: ImageFileProps;
  handleInput: (key: string, value: string) => void;
}

export const useFormState = (name: string): UseFormStateReturnType => {
  const initialForm: ImageFileProps = {
    src: '',
    alt: '',
    name: name,
    time: '',
    isRead: false,
    isCode: false,
    readContent: '',
  };
  const [formState, setFormState] = useState<ImageFileProps>(initialForm);
  const handleInput = (key: string, value: string) => {
    const newFormState = { ...formState, [key]: value };
    setFormState(newFormState);
    console.log(newFormState);
  };
  return { formState, setFormState, initialForm, handleInput };
};
