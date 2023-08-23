// 上传 API 参数类型
interface CreateFileParams {
  fileId: string
  total: number
  filename: string
}

interface UploadChunkParams {
  chunk: Blob
  order: number
  size: number
  fileId: string
}

interface MergeChunkParams {
  fileId: string
}

// 自定义类型
interface CustomFile {
  filename: string
  total: number
  upload: number
}

interface CustomChunk {
  chunk: Buffer
  order: number
  size: number
}
