# Nuxt 3: Upload multiple files using multer module. #
The files will be save in the `public/assets/images` folder and store their `paths` in MongoDB. This allows you to easily access and manipulate the files along with their associated data. If you want to remove a file, you can delete the corresponding document in MongoDB, which in turn will remove the file from the images folder as well as its associated document. See video example.

## Usage ##
* Create a .env file
* Add your mongoDb URL `MONGO_URL=mongodb+srv://......`

[![Example video](https://github.com/ReaganM02/Nuxt3-Upload-Multiple-Files-To-MongoDB/blob/master/public/Screenshot%202023-04-29%20at%201.18.40%20AM.png)](https://asset.cloudinary.com/dg1sh76js/425921b96eaaa55e7597308e09f204d4)
