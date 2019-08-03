export interface Template {
  name: string,
  path?: string,
  branch?: string,
  from?: string
}

export interface Download {
  path:string,
  branch:string,
  from:string,
  dist:string
}

export interface DownloadResult {
  status: number,
  msg: string
}