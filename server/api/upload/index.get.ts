import fileModel from "~/server/models/file.model"
import fs from 'fs'
export default defineEventHandler(async (event) => {
    try {
        const files = await fileModel.find().sort('-createdAt')
        return files
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})