const model = require('../models/gdprModel');

async function getGdprController(req, res) {
    const all = await model.getGdprModel()

    res.json(all)
}

async function getSingleGdprController(req, res) {
    let id = req.params.id


    let single = await model.getSingleGdprModel(id)
    
    res.json(single)
}

function deleteGdprController(req, res) {
    try {
        let id = req.params.id;
        let deleted = model.deleteGdprModel(id)
        res.json({data: deleted})
    } catch (error) {
        res.json({ error: error.message })
    }
}


module.exports = {
    getGdprController,
    getSingleGdprController,
    deleteGdprController,
}