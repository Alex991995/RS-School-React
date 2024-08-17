export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64 string.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };
  });

export async function checkSize(file: File) {
  const tenMB = 10 * 1024 * 1024;

  if (!file || file.size > tenMB) {
    throw new Error('The size of img is too big');
  }
  return await toBase64(file);
}
