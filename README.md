# junk-drawer
![image](https://user-images.githubusercontent.com/16504501/146623762-5213a6ce-f8e2-4162-af94-8b410b358816.png)


Got a folder like this? Tidy it up with `junk-drawer`


Select a directory and the files will automatically be sorted into relevant directories

## Prerequisites

* [Deno](https://deno.land) 1.17.0+

## Usage

- `-p [path]` - *(optional)* the path of the directory to organize; defaults to `./`
- `-d` - *(optional)* dry run mode; shows a preview of move operations. defaults to off 


## Install
1. Clone this repo
1. Run `bin/install`
1. Organize a folder
```sh
junk-drawer -d -p ~/Downloads
```

## Roadmap

- alternative organization strategies, e.g.  by file size or creation date
- "share my screen" mode that cleans up Desktop automagically
- undoable transactions
- auto-rename when conflict, option to force overwrite
- multiple paths
- custom rulesets
