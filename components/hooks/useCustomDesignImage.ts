import { useEffect, useState } from "react";
import jimp from "jimp";
import { createWorker, Worker } from "tesseract.js";
import { EventEmitter } from "events";

function useWorker(): Worker | undefined {
  const [worker, setWorker] = useState<Worker | undefined>();
  useEffect(() => {
    (async () => {
      const w = createWorker();
      await w.load();
      await w.loadLanguage("eng");
      await w.initialize("eng");
      setWorker(w);
    })();
    return () => {
      if (worker) {
        (async () => {
          await worker.terminate();
        })();
      }
    };
  }, []);
  return worker;
}

function clean(inp: string) {
  return inp.replace(/\n/g, "").trim();
}

export default function useCustomDesignImage(file: File | undefined) {
  const worker = useWorker();
  const worker2 = useWorker();
  const worker3 = useWorker();

  const em = new EventEmitter();

  useEffect(() => {
    if (file && worker && worker2 && worker3) {
      (async () => {
        const buf = await (file as any).arrayBuffer();
        const image = await jimp.read(new Buffer(buf));
        const buffer = await image
          .threshold({ autoGreyscale: true, max: 160 })
          .getBufferAsync(file.type);
        const height = image.getHeight();
        const width = image.getWidth();
        try {
          em.emit("start");
          const [titleRec, typeRec, codeRec] = await Promise.all([
            worker.recognize(buffer, {
              rectangle: {
                left: width * 0.29,
                top: height * 0.15,
                width: width * 0.42,
                height: height * 0.13
              }
            }),
            worker2.recognize(buffer, {
              rectangle: {
                left: width * 0.76,
                top: height * 0.7,
                width: width * 0.22,
                height: height * 0.08
              }
            }),
            worker3.recognize(buffer, {
              rectangle: {
                left: width * 0.71,
                top: height * 0.76,
                width: width * 0.26,
                height: height * 0.08
              }
            })
          ]);
          em.emit("data", {
            title: clean(titleRec.data.text),
            type: clean(typeRec.data.text),
            code: clean(codeRec.data.text)
          });
        } catch (e) {
          console.error(e);
        } finally {
          em.emit("finish");
        }
      })();
    }
  }, [file, worker, worker2, worker3]);

  return em;
}
