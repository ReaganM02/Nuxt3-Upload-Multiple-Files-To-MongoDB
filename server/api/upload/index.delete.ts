import fileModel from "~/server/models/file.model"
import fs from 'fs'

export default defineEventHandler(async (event) => {
    try {
        const { id, path } = await readBody(event)
        await fileModel.findByIdAndDelete(id)
        fs.unlinkSync(`public${path}`)
        return 200
    } catch (error) {
        console.log(error)
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})