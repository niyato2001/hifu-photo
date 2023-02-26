import Quagga from '@ericblade/quagga2';

export const scanCode = async (src: string[]): Promise<string[]> => {
  const initialDecode: string[] = [];
  const scan = async (src: string) => {
    await Quagga.decodeSingle(
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
          const newCode = String(result.codeResult.code);
          initialDecode.push(newCode);
          console.log('decode', initialDecode);
        } else {
          console.log('not detected');
          initialDecode.push('not detected');
        }
      },
    );
    return initialDecode;
  };
  //ただのmapではだめでPromise.allを使えばできるけど、順番は適当になりそう。。
  await Promise.all(
    src.map((src) =>
      scan(src).then((val) => {
        console.log(val);
        // const newDecode = val;
        // return newDecode;
      }),
    ),
  );
  console.log('ここでだめならだめ', initialDecode);
  return initialDecode;
};
