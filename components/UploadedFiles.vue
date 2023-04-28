<script setup lang="ts">
export interface IFilesData { name: string; size: number; type: string; lastModified: number }

defineProps<{
    filesData: IFilesData[]
}>()
</script>
<template>
    <ul class="mt-2">
        <li
            v-for="file in filesData"
            class="text-sm text-slate-400 font-light"
        >
            {{ file.name.toLocaleLowerCase() }}
        </li>
    </ul>
</template>