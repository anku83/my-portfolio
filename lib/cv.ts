export const CV_FILE_PATH = "/cv/Specialised%20CV%20Template%20Ankit%20org.docx";

export const CV_FILE_NAME = "Specialised CV Template Ankit org.docx";

export function getCVPreviewUrl(origin?: string) {
  if (!origin) return null;

  const normalizedOrigin = origin.replace(/\/$/, "");
  const publicFileUrl = `${normalizedOrigin}${CV_FILE_PATH}`;

  if (/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(normalizedOrigin)) {
    return null;
  }

  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(publicFileUrl)}`;
}
