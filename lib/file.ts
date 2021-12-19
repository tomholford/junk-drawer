export const fileExtension = (filename: string) => {
  const [ext] = filename.split('.').slice(-1);

  return ext;
}

export const exists = async (path: string) => {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile || stat.isDirectory;
  } catch (_error) {
    return false;
  }
}
