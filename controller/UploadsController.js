const { uploadBase64, resizeImage, getAllSizeImages } = require('../helper/FileSystem')
const fs = require('fs');
const path = require('path');

const upload = async (req, res) => {
    let { image, folder_name, resize_large, resize_medium, resize_small } = req.body;

    if (image) {
        let uploadResp = await uploadBase64(image, folder_name);
        console.log("+++", uploadResp)
        if (uploadResp.status) {
            let imageFile = uploadResp.imageUrl.split('/');
            let fileName = imageFile[(imageFile.length) - 1];
            imageFile[(imageFile.length) - 1] = '';
            let filePath = imageFile.join('/');

            if (resize_large) {
                await resizeImage(uploadResp.imageUrl, resize_large, `${filePath}/L-${fileName}`);
                console.log("ll", uploadResp.imageUrl)
            }

            if (resize_medium) {
                await resizeImage(uploadResp.imageUrl, resize_medium, `${filePath}/M-${fileName}`);
            }

            if (resize_small) {
                await resizeImage(uploadResp.imageUrl, resize_small, `${filePath}/S-${fileName}`);
            }

            console.log('dd', uploadResp.imageUrl);

            res.json({
                status: uploadResp.status,
                imageUrl: getAllSizeImages(uploadResp.imageUrl),
                message: uploadResp.message
            });
        }
        else {
            res.json({
                status: false,
                message: uploadResp.message
            });
        }
    }
    else {
        res.json({
            status: false,
            message: 'Image Field Required'
        });
    }
};

// const videoUploaded = async (req, res) => {
//     let { folder_name } = req.body;
//     console.log(req.files?.video)
//     let video = req.files?.video;
//     console.log(folder_name)
//     console.log('data', video)

//     if (video) {
//         let resp = await uploadVideo(video, folder_name);
//         if (!resp) {
//             return (
//                 res.send({
//                     status: false,
//                     message: "Error in Uploading Video",
//                 })
//             )
//         }

//         return (
//             res.send({
//                 status: true,
//                 message: "Video Uploaded Successfully",
//                 videoPath: resp.videoPath
//             })
//         )
//     }
//     else {
//         res.json({
//             status: false,
//             message: 'Video Field Required'
//         });
//     }
// }


const videoUploaded = async (req, res) => {
    const video = req.files?.video;
    const folderName = req.body.folder_name;

    if (!video || !folderName) {
        return res.status(400).json({ status: false, message: 'Video Field or Folder Name Required' });
    }

    try {
        const uploadDir = path.join(process.cwd(), 'uploads', folderName);
        await fs.promises.mkdir(uploadDir, { recursive: true });

        const savePath = path.join(uploadDir, video.name);
        await video.mv(savePath);

        return res.json({
            status: true,
            message: "Video Uploaded Successfully",
            videoPath: `uploads/${folderName}/${video.name}`
        });
    } catch (err) {
        console.error("Upload Error:", err);
        return res.status(500).json({ status: false, message: 'Upload failed' });
    }
};


module.exports = {
    upload,
    videoUploaded
};