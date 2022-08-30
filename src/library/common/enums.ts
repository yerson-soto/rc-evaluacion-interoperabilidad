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
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS = 'application/vnd.ms-excel',
}

export enum EvaluationStatus {
  Created = 1,
  Pending = 2,
  Completed = 3
}