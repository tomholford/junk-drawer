export const exists = async (path: string) => {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile || stat.isDirectory;
  } catch (_error) {
    return false;
  }
}

export const fileExtension = (filename: string) => {
  const [ext] = filename.split('.').slice(-1);

  return ext;
}

export const hasExtension = (filename: string) => {
  return filename.split('.').length > 1;
}

export const isHidden = (filename: string) => {
  return filename.startsWith('.');
}
