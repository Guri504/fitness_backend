const PageModel = require('../../models/apis/admin/Pages')

const updatePageContent = async (req, res) => {
    let { slug } = req.params;
    let data = req.body;
    let resp = await PageModel.updatePageContent(slug, data);
    if (resp) {
        res.send({
            status: true,
            message: "Page Updated",
            data: resp
        })
    }
    else {
        res.send({
            status: false,
            message: "Not able to update Page."
        })
    }
}

const getPageContent = async (req, res) => {
    let { slug } = req.params;
    let resp = await PageModel.getPageContent(slug);
    if (resp) {
        return (
            res.send({
                status: true,
                message: "Content find successfully",
                data: resp
            })
        )
    }
    else {
        return (
            res.send({
                status: false,
                message: "Not able to find content"
            })
        )
    }
}

module.exports = {
    updatePageContent,
    getPageContent
}