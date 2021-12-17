
import Denomander from "https://deno.land/x/denomander@0.8.1/mod.ts";

const program = new Denomander({
  app_name: "junk drawer",
  app_description: "gotta share your screen? toss your junk in here",
  app_version: "0.0.1",
});

program
  .command('put', 'puts junk away')
  .action(() => { console.log('yep') })
  
program
  .parse(Deno.args)
