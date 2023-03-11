import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { IdImageProps } from '@/component/common/template/PageMain/index';

// interface DownloadImageProps {
//   url: string;
//   filename: string;
// }

export const downloadImages = async (images: IdImageProps[]) => {
  const zip = new JSZip();
  const imagePromises = images.map(async (image) => {
    const photoZip = zip.folder(image.id);
    const response = image.groupImages.map(async (group, i) => {
      const res = await fetch(group.url);
      const blob = await res.blob();
      photoZip?.file(`after${i}.jpg`, blob);
    });
    await Promise.all(response);
    return photoZip;
  });
  await Promise.all(imagePromises);
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'images.zip');
};
