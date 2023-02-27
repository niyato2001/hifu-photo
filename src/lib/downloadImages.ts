import { saveAs } from 'file-saver';
import JSZip from 'jszip';

interface DownloadImageProps {
  url: string;
  filename: string;
}

export const downloadImages = async (images: DownloadImageProps[]) => {
  const zip = new JSZip();
  const imagePromises = images.map(async (image) => {
    const response = await fetch(image.url);
    const blob = await response.blob();
    zip.file(`${image.filename}.jpg`, blob);
  });
  await Promise.all(imagePromises);
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'images.zip');
};
