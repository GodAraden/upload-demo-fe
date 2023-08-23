import axios from 'axios'

export async function createFile(params: CreateFileParams) {
  const { data } = await axios.post<CustomFile & { chunks: number[] }>('/api/create', params)
  return data
}

export async function upLoadChunk(params: UploadChunkParams) {
  const formData = new FormData() // 创建表单类型数据
  for (const key in params) {
    formData.append(key, params[key])
  }
  const { data } = await axios.post<CustomFile>('/api/upload', formData)
  return data
}

export async function mergeChunk(params: MergeChunkParams) {
  const { data } = await axios.post<CustomFile>('/api/merge', params)
  return data
}
