class File {
  path: string;
  isDirectory: boolean;
  isFile: boolean;

  constructor(path: string) {
    this.path = path;
    this.isDirectory = this._stat.isDirectory;  
    this.isFile = this._stat.isFile;  
  }

  private get _stat(): Deno.FileInfo {
    return Deno.statSync(this.path);
  }

  // get ext(): string {
  //   // return this._stat.
  //   return '';
  // }
}

export default File;
