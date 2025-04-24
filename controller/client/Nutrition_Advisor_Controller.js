const NutritionAdvisorModel = require('../../models/apis/admin/Nutrition_Advisor');

const add = async (req, res) => {
    let data = req.body;
    let resp = await NutritionAdvisorModel.insert(data);
    if (!resp) {
        return (
            res.send({
                status: false,
                message: "Not able to submit the data"
            })
        )
    }
    return (
        res.send({
            status: true,
            message: "Data Submitted Successfully",
            data: resp
        })
    )
}

module.exports = {
    add
}