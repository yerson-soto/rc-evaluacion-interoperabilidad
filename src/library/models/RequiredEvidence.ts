import { ContentType } from 'library/common/enums';

export interface RequiredEvidence {
  id: string;
  contentType: ContentType[];
  title: string;
}