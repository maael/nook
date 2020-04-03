import fish from "./fish";
import bugs from "./bugs";
import fossils from "./fossils";
import recipes from "./recipes";
import write from "../util/write";

(async () => {
  await Promise.all([
    getAndWrite("fish", fish),
    getAndWrite("bugs", bugs),
    getAndWrite("fossils", fossils),
    getAndWrite("recipes", recipes)
  ]);
})().catch(e => console.error(e));

async function getAndWrite(name: string, fn: any) {
  const data = await fn();
  await write(name, data);
}
