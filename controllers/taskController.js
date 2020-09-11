const model = require('../models/taskModel');


async function getTaskController(req, res) {

    const post = await model.getTaskModel()

    res.json(post)
}; 

async function getSingleTaskController (req, res) {
    let id = req.params.id


    let task = await model.getSingleTaskModel(id)
    
    res.json(task)
}

function addTaskController(req, res) {
    try {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let all = (year + "-" + month + "-" + day + " Time: " + hour + ":" + minutes + ":" + seconds);
        let task = {
            title: req.body.title,
            done: false,
            created: all,
            urgent: false,
            listID: req.body.listID,
            createdBy: req.user._id
        }

        let result = model.addTaskModel(task)
        res.json(result)

    } catch (error) {
        res.json({ error: error.message })
    }
};

function editTaskController(req, res) {
    try {
        var id = req.params.id;
        let task = {
            title: req.body.title,
            done: req.body.done
        }
        const updatedToDo = model.editTaskModel(id, task)
        res.json(updatedToDo);
    } catch (error) {
        console.log({ error: error.message })
    }
};

function deleteTaskController(req, res) {
    try {
        let id = req.params.id;
        let deleted = model.deleteTaskModel(id)
        res.json({data: deleted})
    } catch (error) {
        res.json({ error: error.message })
    }
};

module.exports = {
    getTaskController,
    getSingleTaskController,
    addTaskController,
    editTaskController,
    deleteTaskController,
}