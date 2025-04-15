const db = require("../../index");

const updatePageContent = async (slug, data) => {
    let timestamp = new Date().toLocaleString();
    try {
        let resp = await db.pages.findOneAndUpdate(
            { slug: slug },
            {
                $set: { ...data, updated_at: timestamp },
                $setOnInsert: {
                    status: 1,
                    created_at: timestamp,
                }
            },
            { upsert: true, returnDocument: "after" }
        )
        console.log("resp", resp)
        return resp;
    } catch (error) {
        return error
    }
}

const getPageContent = async (slug) => {
    try {
        let resp = await db.pages.findOne({slug: slug});
        return resp;
    } catch (error) {
        return false
    }
}

module.exports = { updatePageContent, getPageContent }