import multer from 'multer';
import { callNodeListener } from 'h3';
import fileModel from '~/server/models/file.model';


export default defineEventHandler(async (event) => {
    try {

        let filePaths: string[] = [];
        let fileNames: string[] = []
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/assets/images');
            },
            filename: (req, file, cbd) => {
                const filePath = `${Date.now()}-${file.originalname.toLocaleLowerCase().replace(/\s+/g, '-').replace(/\./g, '-')}`
                filePaths.push(filePath)
                fileNames.push(file.originalname)
                cbd(null, filePath);
            },
        });

        const upload = multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype === 'image/webp') {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type'));
                }
            },
        });

        await callNodeListener(
            // @ts-expect-error: Nuxt 3
            upload.array('file', 10),
            event.node.req,
            event.node.res
        );
        console.log(filePaths.length)
        const bulkOps: any[] = []
        filePaths.forEach((fileName: string, index: number) => {
            const data = {
                insertOne: {
                    document: {
                        path: `/assets/images/${fileName}`,
                        fileName: fileNames[index]
                    }
                }
            }
            bulkOps.push(data)
        })
        await fileModel.bulkWrite(bulkOps)
        return 200;
    } catch (error) {
        console.log(error);
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.',
        });
    }
});