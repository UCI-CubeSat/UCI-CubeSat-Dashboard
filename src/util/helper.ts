export const getImage = (svgFilePath: string, width: number, height: number) => {
  return new Promise((resolve: (value: HTMLImageElement) => void) => {
    const importedImage = new Image(width, height);
    importedImage.addEventListener("load", () => resolve(importedImage));
    importedImage.src = svgFilePath;
    resolve(importedImage)
  });
};
