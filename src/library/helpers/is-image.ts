import { ContentType } from "library/common/enums";

export default function isImage(contentType: string | ContentType): boolean {
  return [ContentType.JPEG, ContentType.JPG, ContentType.PNG].includes(
    contentType as ContentType
  );
};