const { isJSON, foreach } = require('./General')
const { writeFile, existsSync, mkdirSync, unlink } = require('fs');
const { Jimp } = require("jimp");
const fileSystemPath = process.cwd();

const getAllSizeImages = (file) => {
    let data = null;
    if (isJSON(file)) {
        file = JSON.parse(file);
        data = [];
        file.map((item, index) => {
            let path = getOnlyPath(item);
            let name = getFileNameFromPath(item);

            data.push({
                'original': existsSync(item),
                'large': existsSync(`${path}L-${name}`) ? `${path}L-${name}` : '',
                'medium': existsSync(`${path}M-${name}`) ? `${path}M-${name}` : '',
                'small': existsSync(`${path}S-${name}`) ? `${path}S-${name}` : '',
            });
        })
    }
    else {
        let path = getOnlyPath(file);
        let name = getFileNameFromPath(file);
        data = {
            'original': existsSync(file) ? file : '',
            'large': existsSync(`${path}L-${name}`) ? `${path}L-${name}` : '',
            'medium': existsSync(`${path}M-${name}`) ? `${path}M-${name}` : '',
            'small': existsSync(`${path}S-${name}`) ? `${path}S-${name}` : '',
        };
    }

    return data;
}

const getFileNameFromPath = (path) => {
    let name = path.split('/');
    return name[(name.length) - 1];
}

const getOnlyPath = (path) => {
    let name = path.split('/');
    name[(name.length) - 1] = '';
    return name.join('/');
}

const uploadBase64 = async (base64Data, folderName) => {
    let [temp, base64] = base64Data.split(',');
    let ext = await getExtensionFromBase64(base64Data);

    let fileName = `${Date.now()}.${ext}`;
    let imageBuffer = Buffer.from(base64, 'base64');
    let path = null;

    if (folderName) {
        path = `uploads/${folderName}`;
    }
    else {
        path = `uploads`;
    }

    if (!existsSync(path)) {
        mkdirSync(`${fileSystemPath}/${path}`)
    }

    path = `${path}/${fileName}`;

    let uploadFile = new Promise((resolve, reject) => {
        let returnData = null;

        let callBack = async (err) => {
            if (err) {
                returnData = {
                    status: false,
                    imageUrl: null,
                    message: 'Error in image saving'
                };
                resolve(returnData);
            }
            else {
                returnData = {
                    status: true,
                    imageUrl: path,
                    message: 'File Uploaded Successfully',
                };
                resolve(returnData);
            }
        }
        writeFile(path, imageBuffer, 'base64', callBack);
    })

    return await uploadFile;
}

const removeImage = async (path) => {
    if (typeof path == 'string') {
        if (existsSync(path)) {
            unlink(path, (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("File Removed Successfuly")
                }
            })
        }
        else {
            console.log("File Not Found in filesystem")
        }
    }
    else if (typeof path == 'object') {
        foreach(path, (key, item) => {
            removeImage(item)
        })
    }
}

const getExtensionFromBase64 = (base64) => {
    let [mimeType, ext] = base64.split(',')[0].split(';')[0].split('/');

    return ext;
}

const resizeImage = async (uploadImageUrl, sizes, filePath) => {
    return Jimp.read(`${fileSystemPath}/${uploadImageUrl}`)
        .then((obj) => {
            let [w, h] = sizes.split('*');
            let newFilePath = `${fileSystemPath}/${filePath}`;
            let resp;

            if (process.env.resizeMethod == 'aspect_ratio') {
                if (process.env.heightAspectRatio == 'false' && process.env.widthAspectRatio == 'true') {
                    resp = obj.resize({ w: Jimp.AUTO, h: parseInt(h) }).write(newFilePath);
                }

                if (process.env.heightAspectRatio == 'true' && process.env.widthAspectRatio == 'false') {
                    resp = obj.resize({ w: parseInt(w), h: Jimp.AUTO }).write(newFilePath);
                }

                if (process.env.heightAspectRatio == 'false' && process.env.widthAspectRatio == 'false') {
                    resp = obj.resize({ w: parseInt(w), h: parseInt(h) }).write(newFilePath);
                }
            }
            else if (process.env.resizeMethod == 'crop') {
                resp = obj.crop({ x: 50, y: 50, w: parseInt(w), h: parseInt(h) }).write(newFilePath);
            }

            if (resp) {
                return {
                    status: true,
                    file: filePath
                }
            }
            else {
                return {
                    status: false,
                    file: null
                }
            }
        })
        .catch((err) => {
            console.error(err);
            return {
                status: false,
                file: null
            }
        });
}

const imageGetter = (image) => {
    return image ? getAllSizeImages(image) : null;
}

// For Videos

// const getExtensionFromVideoPath = async (videoPath) => {
//     let ext = videoPath.split('.').pop();
//     return ext;
// };

// const uploadVideo = async (video, folderName) => {
//     let ext = await getExtensionFromVideoPath(video);
//     let fileName = `${Date.now()}.${ext}`
//     let path = null;

//     if (folderName) {
//         path = `uploads/${folderName}`
//     }
//     else {
//         path = 'uploads'
//     }

//     if (!existsSync(path)) {
//         mkdirSync(`${fileSystemPath}/${path}`)
//     }

//     path = `${path}/${fileName}`

//     let uploadV = new Promise((resolve, reject) => {
//         let returnData = null;
//         let callBack = async (err) => {
//             if (err) {
//                 returnData = {
//                     status: false,
//                     videoPath: null,
//                     message: 'Error in video saving'
//                 };
//                 resolve(returnData);
//             }
//             else {
//                 returnData = {
//                     status: true,
//                     videoPath: path,
//                     message: "Video Uloaded Successfully"
//                 };
//                 resolve(returnData);
//             }
//         }
//         writeFile(path, "Video", callBack)
//     })
//     return await uploadV
// }

module.exports = {
    getAllSizeImages,
    getFileNameFromPath,
    getOnlyPath,
    uploadBase64,
    resizeImage,
    imageGetter,
    removeImage,
    // getExtensionFromVideoPath,
    // uploadVideo
}