export const formatImagesURI = (imageUri: string) => {
    if (!imageUri.length) return;
    return imageUri.split('/').pop();
};
