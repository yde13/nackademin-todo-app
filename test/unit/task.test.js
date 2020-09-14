const taskModel = require('../../models/taskModel')
require('chai').should()

describe('Task', () => {
    beforeEach(() => {
        taskModel.clear()
    })

    it('Should get all todos', async () => {
        await taskModel.addTaskModel([{
            title: 'todo 1',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',
            createdBy: 'Hugo',
            _id: '1'
        },
        {
            title: 'todo 2',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',
            createdBy: 'Philip',
            _id: '2'
        }])
        const getTodos = await taskModel.getTaskModel()
        getTodos.should.eql([ //should.EQL eftersom det är arrays!
            {
                title: 'todo 1',
                done: false,
                created: '1998',
                urgent: false,
                listID: '1',
                createdBy: 'Hugo',
                _id: '1'
            },
            {
                title: 'todo 2',
                done: false,
                created: '1998',
                urgent: false,
                listID: '1',
                createdBy: 'Philip',
                _id: '2'
            },
        ])
    })

    it('Should get a single todo', async () => {
        await taskModel.addTaskModel([{
            title: 'todo 1',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',
            createdBy: 'Hugo',
            _id: '1'

        },
        {
            title: 'todo 2',
            done: true,
            created: '1993',
            urgent: false,
            listID: '1',
            createdBy: 'Philip',
            _id: '2'
        }
        ])

        let id = 'Philip'
        const getSingleTask = await taskModel.getSingleTaskModel(id)

        getSingleTask.should.eql( //should.EQL eftersom det är arrays!
            [{
                title: 'todo 2',
                done: true,
                created: '1993',
                urgent: false,
                listID: '1',
                createdBy: 'Philip',
                _id: '2'

            }])

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
            title: "Tvätta",
            done: false,
            created: "2020-04-24",
            _id: "3"
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
            title: "Tvätta",
            done: false,
            created: "2020-04-24",
            _id: "4"
        })
        let id = '4'
        const deleteTodo = await taskModel.deleteTaskModel(id)
        deleteTodo.should.equal(1) //1 = true
    })

})