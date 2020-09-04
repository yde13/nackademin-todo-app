const model = require('../models/taskModel');


async function getTaskController(req, res) {
    
    const post = await model.getTaskModel()
    // console.log(post);
    
    res.json(post)
}; //skicka role så att man kan se om det är en admin eller user

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
            urgent: false
        }
        console.log(task);

        let result = model.addTaskModel(task)
        res.json(task)

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
        console.log(req.body)
        const updatedToDo =  model.editTaskModel(id, task)
        console.log(" Todo uppdaterad");
        res.json(updatedToDo);
    } catch (error) {
        console.log({ error: error.message })
    }
};

// async function taskIsDoneController(req, res) {
//     try {
//         var id = req.params._id;
//         let done = {
//             done: req.body.done,
//         }
//         console.log(req.body)
//         const updateToDo = await model.taskIsDoneModel(id, done)
//         console.log(updateToDo + " Todo done");

//         res.json(updateToDo);

//     } catch (error) {
//         res.json({ error: error.message });
//     }
// }

 function deleteTaskController(req, res) {
    try {
        let id = req.params.id;
         model.deleteTaskModel(id)
        res.json("Deleted " + id)
    } catch (error) {
        res.json({ error: error.message })
    }
};

module.exports = {
    getTaskController,
    addTaskController,
    editTaskController,
    deleteTaskController,
    //taskIsDoneController
}