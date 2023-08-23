<template>
  <input type="file" ref="input" />
  <br /><br />
  <button id="upload" @click="onUpload">上传</button> &nbsp;
  <progress min="0" max="100" :value="uploadProgress"></progress>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createFile, mergeChunk, upLoadChunk } from './api/upload'
import { createChunk } from './utils/upload'

const USER_ID = '09226506-5416-46c4-bbda-d861229c1cba'

const input = ref<HTMLInputElement>()
const uploadProgress = ref(0)

// FIXME: 此处为 DEMO，实际由 用户 ID，虚拟路径，文件名 Hash 得来
const getFileId = (file: File) => USER_ID

async function onUpload() {
  const file = input.value.files[0]
  if (!file) return
  const fileId = getFileId(file)

  const remoteFile = await createFile({ filename: file.name, total: file.size, fileId })

  // TODO: if (/* 数据库有对应的文件 */) return

  const chunks = createChunk(file)

  uploadProgress.value = (remoteFile.upload / remoteFile.total) * 100

  // FIXME: 这里仅作示例使用
  const res = await Promise.all(
    chunks.map((chunk, i) => {
      return new Promise(async resolve => {
        if (!remoteFile.chunks?.includes(i)) {
          const data = await upLoadChunk({
            chunk,
            order: i,
            size: chunk.size,
            fileId
          })
          uploadProgress.value = (data.upload / data.total) * 100
          resolve(data)
        } else {
          resolve({ exists: true })
        }
      })
    })
  )

  if (res.every(chunk => chunk)) {
    const data = await mergeChunk({ fileId })
    // 后面可以根据返回信息进行必要的提示
  }
}
</script>
