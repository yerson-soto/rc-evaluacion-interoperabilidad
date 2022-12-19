export const getDocumentUrl = (path: string): string => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const cleanedPath = path.replace(/[\\\\]/g, '/');
  const url = baseUrl + '/' + cleanedPath;

  return url;
}