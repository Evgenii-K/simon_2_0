export interface IRecord {
  dateTime: string,
  score: number,
  speedLevel: number
}

export enum ERecordType {
  SIMON_RECORD = 'simonRecord'
}

export interface ISkin {
  name: string,
  file: File
}