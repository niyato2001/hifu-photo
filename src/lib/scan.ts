import Quagga from '@ericblade/quagga2';

export const scanCode = async (src: string[]): Promise<string[]> => {
  const initialDecode: string[] = [];
  const scan = async (src: string) => {
    //decodeをする（時間がかかる処理なので待つ）
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
        if (result?.codeResult) {
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
    //decodeが終わったら、initialDecode を return する（不要）
    // return initialDecode;
  };

  await src.reduce(
    //scan();自体がPromiseなのでOK。ここでinitialDecodeに追加変更していく。
    (promise, src) =>
      promise.then(async () => {
        await scan(src);
      }),
    Promise.resolve(),

    // await Promise.all(
    //ただのmapではだめでPromise.allを使えばできるけど、順番は適当になる（並列処理だとだめ。reduceを使って直列処理にする必要がある。）
    //   src.map(
    //scan();自体がPromiseなのでOK。ここでinitialDecodeに追加変更していく。
    // (src) => scan(src),
    // .then((val) => {
    //   console.log(val);
    //   // const newDecode = val;
    //   // return newDecode;
    // }),
  ),
    console.log(
      'await Promise.all (Promise)しているのでこの処理が終わってからinitialDecode を出力',
      initialDecode,
    );
  //この return は必要！
  return initialDecode;
};
