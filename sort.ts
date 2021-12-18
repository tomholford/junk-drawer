interface sortArgs {
  inputPath: string;
  outputPath: string;
  dry: boolean;
}

import { ensureDir, join } from "./deps.ts";
import { asyncForEach } from "./lib/async_for_each.ts";
import { fileExtension } from './lib/file.ts';

export const sort = async ({ inputPath, outputPath, dry = false }: sortArgs) => {
  try {
    const inputStat = await Deno.stat(inputPath);
    if(!inputStat.isDirectory) {
      console.log(`${inputPath} is not a valid directory :(`);
      return;
    }    
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log(`${inputPath} not found :(`);
      return;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }

  console.log(`sorting ${inputPath} ...`);

  // Build file map
  let numEntries = 0;
  const fileMap: Record<string, Deno.DirEntry[]> = {};

  for await (const dirEntry of Deno.readDir(inputPath)) {
    numEntries += 1;
    if(dirEntry.isFile) {
      const extension = fileExtension(dirEntry.name);
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

  const filetypes = Object.keys(fileMap).sort();
  const fileCount = filetypes.reduce((memo, current) => {
    return memo += fileMap[current].length;
  }, 0);

  console.log(`found ${fileCount} files${filetypes.length > 0 ? ` [${filetypes.join(', ')}] ` : ' '}out of ${numEntries} total paths`);

  if (fileCount === 0) {
    console.log('nothing to do :)');
    return;
  }

  // Perform rename
  console.log(`moving files ...`);

  await asyncForEach(filetypes, async (type) => {
    await asyncForEach(fileMap[type], async (file) => {
      const oldPath = join(inputPath, file.name);
      const newDir = join(outputPath, type);
      const newPath = join(newDir, file.name);
      if (dry) {
        console.log(`[dry run] would move ${oldPath} --> ${newPath}`)
      } else {
        console.log(`moving ${oldPath} --> ${newPath} ...`);
        await ensureDir(newDir);
        await Deno.rename(oldPath, newPath);
      }
    })
  })

  console.log('done :)');
};
