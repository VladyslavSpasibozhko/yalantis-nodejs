export const fileExtension = (extension: string): boolean => {
  const supportedExtension = ['png', 'jpeg', 'jpg'];
  const ext = extension.split('/');

  return supportedExtension.includes(ext[ext.length - 1]);
};
