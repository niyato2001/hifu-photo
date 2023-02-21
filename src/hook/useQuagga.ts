import Quagga from '@ericblade/quagga2';

export const Scanner = (src: string) => {
  Quagga.decodeSingle(
    {
      decoder: {
        readers: ['codabar_reader'],
        // List of active readers
      },
      locate: true,
      // try to locate the barcode in the image
      src: src,
      // or 'data:image/jpg;base64,' + data
    },
    function (result) {
      if (result.codeResult) {
        console.log('result', result.codeResult.code);
      } else {
        console.log('not detected');
      }
    },
  );
};
