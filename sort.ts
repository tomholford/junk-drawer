interface sortArgs {
  path: string
}

import { fileExtension } from './lib/file.ts';

export const sort = async ({ path }: sortArgs) => {
  console.log(`sorting ${path} ...`);

  let numEntries = 0;
  const fileMap: Record<string, Deno.DirEntry[]> = {};

  for await (const dirEntry of Deno.readDir(path)) {
    console.log(`handling ${dirEntry.name}`)
    numEntries += 1;
    if(dirEntry.isFile) {
      const extension = fileExtension(dirEntry.name);
      console.log(extension)
      if(!extension) {
        console.log(`no extension for ${dirEntry.name}, skipping`);
        continue;
      }
      if(extension in fileMap) {
        fileMap[extension].push(dirEntry);
      } else {
        fileMap[extension] = [dirEntry];
      }
    }
  }

  console.log(fileMap);

  console.log(`found ${Object.keys(fileMap).length} filetypes out of ${numEntries} path entries`)
}
