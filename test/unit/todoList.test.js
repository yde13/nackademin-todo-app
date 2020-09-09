const todoListModel = require('../../models/todoListModel')
const taskModel = require('../../models/taskModel')

require('chai').should()

describe('TodoList', () => {
    beforeEach(() => {
        todoListModel.clear()
    })

    it('Should get all todoLists', async () => {
        await todoListModel.addTodoListModel([{
            title: "Todolist 1",
            listID: "1",
            _id: '1'
        },
        {
            title: "Todolist 2",
            listID: "2",
            _id: '2'

        }])
        const getTodoLists = await todoListModel.getTodoListModel()
        getTodoLists.should.eql([ //should.EQL eftersom det är arrays!
            {
                title: "Todolist 1",
                listID: "1",
                _id: '1'

            },
            {
                title: "Todolist 2",
                listID: "2",
                _id: '2'

            },
        ])
    })

    it('Should get all from a single todolist', async () => {
        await taskModel.addTaskModel({
            title: 'todo list',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',
            _id: '1'

        })
        await todoListModel.addTodoListModel([{
            title: "Todolist 1",
            listID: "1",
            _id: '4'
        },
        {
            title: "Todolist 2",
            listID: "2",
            _id: '2'

        }])

        let id = '1'
        const getSingleTodoList = await todoListModel.getSingleTodoListModel(id)

        getSingleTodoList.should.eql( //should.EQL eftersom det är arrays!
            [{
                title: 'todo list',
                done: false,
                created: '1998',
                urgent: false,
                listID: '1',
                _id: '1'

            }])

    })

    it('Should add a todo list', async () => {
        const todolist = {
            title: "Todolist 1",
            listID: "1",
            _id: "1"
        }
        const addTodoList = await todoListModel.addTodoListModel(todolist)
        addTodoList.should.eql({
            title: "Todolist 1",
            listID: "1",
            _id: "1"
        })
    })

    it('Should update a todolist', async () => {
        await todoListModel.addTodoListModel({
            title: "Todolist 1",
            listID: "2",
            _id: "1"
        })
        let id = '1'
        let todolist = {
            title: "Todolist 3",
        }
        const updateTodolist = await todoListModel.editTodoListModel(id, todolist)
        updateTodolist.should.equal(1) //1 = true, how many posts u have edited
    })

    it('Should delete a todolist', async () => {
        await todoListModel.addTodoListModel({
            title: "Todolist 1",
            listID: "2",
            _id: "1"
        })
        let id = '1'

        const deleteTodolist = await todoListModel.deleteTodoListModel(id)
        deleteTodolist.should.equal(1) //1 = true, how many posts u have edited
    })

})