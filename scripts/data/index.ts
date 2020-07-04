import fish from "./fish";
import embellishFish from "./embellishFish";
import embellishBugs from "./embellishBugs";
import bugs from "./bugs";
import fossils from "./fossils";
import recipes from "./recipes";
import paintings from "./paintings";
import sculptures from "./sculptures";
import deepsea from './deepsea';
import write from "../util/write";

(async () => {
  await Promise.all([
    getAndWrite('deepsea', deepsea),
    // getAndWrite("fish", fish),
    // getAndWrite("bugs", bugs),
    // getAndWrite("fossils", fossils),
    // getAndWrite("recipes", recipes),
    // getAndWrite("paintings", paintings),
    // getAndWrite("sculptures", sculptures)
  ]);
  // await Promise.all([
  //   getAndWrite("fish", embellishFish),
  //   getAndWrite("bugs", embellishBugs)
  // ]);
})().catch(e => console.error(e));

async function getAndWrite(name: string, fn: any) {
  const data = await fn();
  await write(name, data);
}
