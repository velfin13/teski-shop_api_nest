export const fileFilters = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if (!file) return callback(new Error('File is empty'), false);
    const fileType = file.mimetype.split('/')[1];
    const validExtension = ['png','jpg','jpeg'];
    if (validExtension.includes(fileType)) {
        return callback(null,true)
    }
    callback(null, false);
}