import { useEffect, useState } from "react";
import jimp from "jimp";
import { createWorker } from "tesseract.js";

function useThresholdedImage(file: File | undefined) {
  const [thresholded, setThresholded] = useState<Buffer | undefined>();
  useEffect(() => {
    (async () => {
      if (file) {
        const buf = await (file as any).arrayBuffer();
        const image = await jimp.read(new Buffer(buf));
        const buffer = await image
          .threshold({ autoGreyscale: true, max: 150 })
          .getBufferAsync(file.type);
        setThresholded(buffer);
      }
    })();
  }, [file]);
  return thresholded;
}

function useAsyncMemo<T>(fn: () => Promise<T>): T | undefined {
  const [m, setM] = useState<T | undefined>();
  useEffect(() => {
    (async () => {
      setM(await fn());
    })();
  }, []);
  return m;
}

function useImageDimensions(file: File | undefined) {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  useEffect(() => {
    if (!file) return;
    const fr = new FileReader();
    fr.onload = function() {
      let img = new Image();

      img.onload = function() {
        setDimensions({ width: img.width, height: img.height });
        img = null as any;
      };

      img.src = (fr.result || "").toString();
    };

    fr.readAsDataURL(file);
  }, [file]);
  return dimensions;
}

async function initWorker() {
  const w = createWorker();
  await w.load();
  await w.loadLanguage("eng");
  await w.initialize("eng");
  return w;
}

function clean(inp: string) {
  return inp.replace(/\n/g, "").trim();
}

export default function useCustomDesignImage(file: File | undefined) {
  const worker = useAsyncMemo(initWorker);
  const worker2 = useAsyncMemo(initWorker);
  const worker3 = useAsyncMemo(initWorker);
  const { width, height } = useImageDimensions(file);
  const thresholded = useThresholdedImage(file);
  const [data, setData] = useState({
    title: "",
    code: "",
    type: "",
    maker: "",
    makerCode: ""
  });

  useEffect(() => {
    if (thresholded && worker && worker2 && worker3) {
      (async () => {
        const [titleRec, typeRec, codeRec] = await Promise.all([
          worker.recognize(thresholded, {
            rectangle: {
              left: width * 0.29,
              top: height * 0.15,
              width: width * 0.42,
              height: height * 0.13
            }
          }),
          worker2.recognize(thresholded, {
            rectangle: {
              left: width * 0.76,
              top: height * 0.7,
              width: width * 0.22,
              height: height * 0.08
            }
          }),
          worker3.recognize(thresholded, {
            rectangle: {
              left: width * 0.71,
              top: height * 0.76,
              width: width * 0.26,
              height: height * 0.08
            }
          })
        ]);
        setData(d => ({
          ...d,
          title: clean(titleRec.data.text),
          type: clean(typeRec.data.text),
          code: clean(codeRec.data.text)
        }));
      })();
    }
  }, [thresholded, worker, worker2, worker3]);

  return data;
}
