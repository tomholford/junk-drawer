# junk-drawer
![image](https://user-images.githubusercontent.com/16504501/146623762-5213a6ce-f8e2-4162-af94-8b410b358816.png)


Got a folder like this? Tidy it up with `junk-drawer`


Select a directory and the files will automatically be sorted into relevant directories, arranged by filetype.

## Prerequisites

* [Deno](https://deno.land) 1.17.0+

## Usage

- `-i /path/to/input` - *(optional)* the path of the directory to organize; defaults to `./`
- `-o /path/to/output` - *(optional)* the path of the directory to move the organized files to; defaults to `./`
- `-d` - *(optional)* dry run mode; shows a preview of move operations. defaults to off 

## Install
1. Clone this repo
1. Run `bin/install`
1. Organize a folder
```sh
junk-drawer -d -i ~/Downloads
```

## Example
```
$ junk-drawer sort -d -i ./test -o ./other
sorting ./test ...
found 1 files [txt] out of 1 total paths
moving files ...
other/txt/lol.txt already exists ...
will move as other/txt/1639871946323_lol.txt to avoid overwrite
[dry run] would move test/lol.txt --> other/txt/1639871946323_lol.txt
done :)
```

## Roadmap

- alternative organization strategies, e.g.  by file size or creation date
- "share my screen" mode that cleans up Desktop automagically
- undoable transactions
- auto-rename when conflict, option to force overwrite
- multiple paths
- custom rulesets
