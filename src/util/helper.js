export const getImage = (svgFilePath, width, height) => {
  return new Promise((resolve) => {
    const importedImage = new Image(width, height);
    importedImage.addEventListener("load", () => resolve(importedImage));
    importedImage.src = svgFilePath;
  });
};
