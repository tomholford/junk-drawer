export const fileExtension = (filename: string) => {
  const [ext] = filename.split('.').slice(-1);

  return ext;
}
