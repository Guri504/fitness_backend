const PageModel = require('../../models/apis/admin/Pages');

const getPageContent = async (req, res) => {
    let { slug } = req.params;
    let resp = await PageModel.getPageContent(slug);
    if(resp){
        return(
            res.send({
                status: true,
                message: "Content find successfully",
                data: resp
            })
        )
    }
    else{
        return(
            res.send({
                status: false,
                message: "Not able to find content"
            })
        )
    }
}

module.exports = {
    getPageContent
}