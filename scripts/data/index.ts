import fish from './fish';
import bugs from './bugs';
import write from '../util/write';

(async () => {
  await Promise.all([getAndWrite('fish', fish), getAndWrite('bugs', bugs)]);
})().catch((e) => console.error(e));

async function getAndWrite (name: string, fn: any) {
  const data = await fn();
  await write(name, data);
}