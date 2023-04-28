<script lang="ts" setup>
import { Types } from 'mongoose';

export interface IFiles {
    _id: Types.ObjectId
    path: string
    fileName: string
    createdAt: Date
    updatedAt: Date
}
defineProps<{
    files: IFiles[]
}>()

const emit = defineEmits<{
    (e: 'delete'): void
}>()

const handleDeleteFile = async (id: string, path: string): Promise<void> => {
    await useFetch('/api/upload', {
        method: 'DELETE',
        body: { id, path }
    })
    emit('delete')
}

</script>
<template>
    <ul class="grid grid-cols-3 gap-4">
        <li
            v-for="file in files"
            :key="file._id.toString()"
            class="shadow-md shadow-slate-300 rounded p-2 bg-white hover:shadow-xl hover:shadow-slate-300 relative"
        >
            <span
                class="absolute z-10 bg-white bg-opacity-70 p-1.5 rounded-full right-[15px] top-[15px] cursor-pointer"
                @click.prevent="handleDeleteFile(file._id.toString(), file.path)"
            >
                <TrashIcon class="w-4 h-4 text-rose-500" />
            </span>
            <img :src="`${file.path}`" />
            <div class="text-slate-600 capitalize text-sm mt-2">{{ file.fileName }}</div>
            <div class="text-slate-400 font-light text-xs mt-1">
                {{ useDateFormat(file.createdAt, 'MMM-DD-YYYY').value }} ({{ useTimeAgo(file.createdAt).value }})
            </div>
        </li>
    </ul>
</template>
<style scoped lang="css"></style>