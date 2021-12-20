interface sortArgs {
  inputPath: string;
  outputPath: string;
  dry: boolean;
}

import { IGNORED_EXTENSIONS } from "./constants.ts";
import { ensureDir, join } from "./deps.ts";
import { asyncForEach } from "./lib/async_for_each.ts";
import { exists, fileExtension, hasExtension, isHidden } from './lib/file.ts';

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
      const filename = dirEntry.name;

      // ignore hidden files
      if(isHidden(filename)) {
        console.log(`hidden files are ignored, skipping ${filename}`);
        continue;
      }

      // ignore files without extension
      if(!hasExtension(filename)) {
        console.log(`files without extension are ignored, skipping ${filename}`);
        continue;
      }

      // ignore files with blacklisted extensions
      const extension = fileExtension(filename);
      if(IGNORED_EXTENSIONS.includes(extension)) {
        console.log(`${extension} files are ignored, skipping`);
        continue;
      }

      if(!extension) {
        console.log(`no extension for ${filename}, skipping`);
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
      let newPath = join(newDir, file.name);
      const pathExists = await exists(newPath);
      if (pathExists) {
        console.log(`${newPath} already exists ...`);
        newPath = join(newDir, `${Date.now()}_${file.name}`);
        console.log(`will move as ${newPath} to avoid overwrite`);
      }

      if (dry) {
        console.log(`[dry run] would move ${oldPath} --> ${newPath}`)
      } else {
        await ensureDir(newDir);
        console.log(`moving ${oldPath} --> ${newPath} ...`);
        await Deno.rename(oldPath, newPath);
      }
    })
  })

  console.log('done :)');
};
