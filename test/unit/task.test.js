const taskModel = require('../../models/taskModel')
require('chai').should()

describe('Task', () => {
    beforeEach(() => {
        taskModel.clear()
    })

    it('Should get all todos', async () => {
        await taskModel.addTaskModel([{
            title: "Städa",
            done: false,
            created: "2020-07-06",
            _id: "1"
        },
        {
            title: "Laga mat",
            done: true,
            created: "2020-03-12",
            _id: "2"
        }])
        const getTodos = await taskModel.getTaskModel()
        getTodos.should.eql([ //should.EQL eftersom det är arrays!
            {
                title: "Städa",
                done: false,
                created: "2020-07-06",
                _id: "1"
            },
            {
                title: "Laga mat",
                done: true,
                created: "2020-03-12",
                _id: "2"
            },
        ])
    })

    it('Should add a todo', async () => {
        const todo = {
            title: "Diska",
            done: true,
            created: "2020-03-12",
            _id: "7"
        }
        const addTodo = await taskModel.addTaskModel(todo)
        addTodo.should.eql({
            title: "Diska",
            done: true,
            created: "2020-03-12",
            _id: "7"
        })
    })

    it('Should update a todo', async () => {
        await taskModel.addTaskModel({
            title:"Tvätta",
            done: false,
            created:"2020-04-24",
            _id:"3"
        })
        let id = '3'
        let todo = {
            title: 'Tvätta',
            done: true
        }
        const updateTodo = await taskModel.editTaskModel(id, todo)
        updateTodo.should.equal(1) //1 = true, how many posts u have edited
    })

    it('Should delete a todo', async () => {
        await taskModel.addTaskModel({
            title:"Tvätta",
            done: false,
            created:"2020-04-24",
            _id:"4"
        })
        let id = '4'
        const deleteTodo = await taskModel.deleteTaskModel(id)
        deleteTodo.should.equal(1) //1 = true
    })

})