<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { IFiles } from './components/ListOfFiles.vue'

const { data: files, refresh } = await useFetch<IFiles[]>('/api/upload')

const dropZoneRef = ref<HTMLDivElement>()
const filesData = ref<File[]>([])

async function onDrop(files: File[] | null) {
  filesData.value = []
  filesData.value = files!
}
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const handleUploadFiles = async (): Promise<void> => {
  files.value = []
  const body = new FormData();
  for (let i = 0; i < filesData.value!.length; i++) {
    body.append('file', filesData.value![i])
  }
  console.log(body)
  await useFetch('/api/upload', {
    method: 'POST',
    body
  })
  await refresh()
  filesData.value = []
}

</script>

<template>
  <div>
    <div class="flex justify-center bg-slate-100 p-6">
      <div
        ref="dropZoneRef"
        class="max-w-lg w-full rounded p-4 bg-white shadow-slate-300 outline-1 outline-slate-200 outline"
        :class="{ 'outline-1 outline-slate-400': isOverDropZone }"
      >
        <div
          v-if="filesData.length === 0"
          class="text-center text-slate-300 grid justify-center"
          :class="{ 'text-slate-400': isOverDropZone }"
        >
          <UploadIcon class="h-6 m-auto" />
          <div>Drop Items Here</div>
        </div>
        <div v-else>
          <UploadedFiles :files-data="filesData" />
          <button
            @click="handleUploadFiles"
            class="bg-blue-700 text-white text-sm uppercase px-4 py-2 rounded-full mt-4 w-full font-bold"
          >Upload
            Files</button>
        </div>
      </div>
    </div>
    <!-- Output the files -->
    <div
      v-if="files"
      class="flex justify-center bg-slate-50 p-4"
    >
      <div class="max-w-2xl w-full p-2">
        <ListOfFiles
          v-if="files.length > 0"
          :files="files!"
          @delete="refresh"
        />
      </div>
    </div>
  </div>
</template>