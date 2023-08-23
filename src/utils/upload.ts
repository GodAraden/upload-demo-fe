export const MAX_CHUNK_SIZE = 20 * 1024 * 1024 // 暂定 20MB 为一块

// 文件切片
export function createChunk(file: File) {
  const chunkList: Blob[] = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push(file.slice(cur, cur + MAX_CHUNK_SIZE))
    cur += MAX_CHUNK_SIZE
  }
  return chunkList
}
