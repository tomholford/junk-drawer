import { Denomander } from './deps.ts';
import { sort } from "./sort.ts";

const identity = (v: unknown) => v;

const program = new Denomander({
  app_name: "junk drawer",
  app_description: "gotta share your screen? toss your junk in here",
  app_version: "0.0.1",
});

export const main = () => {
  program
    .command('sort', 'puts junk away')
    .option('-p --path', 'path', identity, './')
    .option('-d --dry', 'dry run', identity, false)
    .action(() => { sort({ path: program.path, dry: program.dry }) })
    .parse(Deno.args)  
}
