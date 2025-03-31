const { uploadBase64, resizeImage, getAllSizeImages } = require('../helper/FileSystem')

const upload = async (req, res) => {
    let { image, folder_name, resize_large, resize_medium, resize_small } = req.body;

    if(image)
    {
        let uploadResp = await uploadBase64(image, folder_name);
        console.log("+++", uploadResp)
        if(uploadResp.status)
        {
            let imageFile = uploadResp.imageUrl.split('/');
            let fileName = imageFile[(imageFile.length) - 1];
            imageFile[(imageFile.length) - 1] = '';
            let filePath = imageFile.join('/');

            if(resize_large)
            {
                await resizeImage(uploadResp.imageUrl, resize_large, `${filePath}/L-${fileName}`);
                console.log("ll", uploadResp.imageUrl)
            }   

            if(resize_medium)
            {
                await resizeImage(uploadResp.imageUrl, resize_medium, `${filePath}/M-${fileName}`);
            }

            if(resize_small)
            {
                await resizeImage(uploadResp.imageUrl, resize_small, `${filePath}/S-${fileName}`);
            }

            console.log('dd', uploadResp.imageUrl);

            res.json({
                status: uploadResp.status,
                imageUrl: getAllSizeImages(uploadResp.imageUrl),
                message: uploadResp.message
            });
        }
        else
        {
            res.json({
                status: false,
                message: uploadResp.message
            });
        }
    }
    else
    {
        res.json({
            status: false,
            message: 'Image Field Required'
        });
    }
};


module.exports = { upload };