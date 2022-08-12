export enum UserType {
  User = 1,
  Support = 2,
  Admin = 3,
}

export enum ContentType {
  TEXT = 'text/plain',
  JPG = 'image/jpg',
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  CSV = 'text/csv',
  PDF = 'application/pdf',
  WORD = 'application/msword',
  EXCEL = 'application/vnd.ms-excel',
}

export enum EvaluationStatus {
  Created = 1,
  Pending = 2,
  Completed = 3
}