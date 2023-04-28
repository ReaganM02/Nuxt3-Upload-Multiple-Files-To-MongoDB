import mongoose from "mongoose"

const schema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'File field is required.']
    },
    fileName: {
        type: String,
        required: [true, 'File Name is required']
    }
}, { timestamps: true })

export default mongoose.model('File', schema)