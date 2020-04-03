import { promises as fs } from "fs";
import path from "path";
import traverse, {
  cleanStrings,
} from "./cleaners";

export default async function write(name: string, data: any) {
  const cleanData = traverse(data, [
    cleanStrings,
  ]);
  try {
    await fs.writeFile(
      path.join(__dirname, "..", "..", "data", `${name}.json`),
      JSON.stringify(cleanData, undefined, 2)
    );
  } catch (e) {
    console.error("error writing", name, e.message);
  }
}