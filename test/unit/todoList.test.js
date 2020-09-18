const todoListModel = require('../../models/todoListModel')
const taskModel = require('../../models/taskModel')
const db = require('../../database/database');


require('chai').should()

describe('TodoList', function() {
    before(async function () {
        await db.connect();
    });
    after(async function () {
        await db.disconnect();
    });
    beforeEach(() => {
        todoListModel.clear()
    })

    it('Should get all todoLists', async () => {
        const result = await todoListModel.addTodoListModel({
            title: "Todolist 1",
            listID: "1",
        })
        const getTodoLists = await todoListModel.getTodoListModel()
        // console.log(getTodoLists[0]._id);
        
        // getTodoLists.should.eql( //should.EQL eftersom det är arrays!
        //     {
        //         title: "Todolist 1",
        //         listID: "1",
        //         _id: '1'

        //     })
        getTodoLists[0].title.should.be.equal('Todolist 1') 
        getTodoLists[0].listID.should.be.equal('1') 
        getTodoLists[0]._id.should.be.equal(getTodoLists[0]._id) 

    })
            
    it('Should get all from a single todolist', async () => {
        const task = await taskModel.addTaskModel({
            title: 'todo list',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',

        })
        const list = await todoListModel.addTodoListModel([{
            title: "Todolist 1",
            listID: "1",
        },
        {
            title: "Todolist 2",
            listID: "2",

        }])

        let id = '1'
        const getSingleTodoList = await todoListModel.getSingleTodoListModel(id)

        // getSingleTodoList.should.eql( //should.EQL eftersom det är arrays!
        //     [{
        //         title: 'todo list',
        //         done: false,
        //         created: '1998',
        //         urgent: false,
        //         listID: '1',
        //         _id: '1'

        //     }])

        getSingleTodoList[0].title.should.be.equal('todo list') 
        getSingleTodoList[0].listID.should.be.equal('1') 
        getSingleTodoList[0].created.should.be.equal('1998') 

        // getTodoLists[0]._id.should.be.equal(getTodoLists[0]._id) 

    })

    it('Should add a todo list', async () => {
        const todolist = {
            title: "Todolist 1",
            listID: "1",
        }
        const addTodoList = await todoListModel.addTodoListModel(todolist)
        // addTodoList.should.eql({
        //     title: "Todolist 1",
        //     listID: "1",
        //     _id: "1"
        // })
        addTodoList.title.should.be.equal('Todolist 1') 
        addTodoList.listID.should.be.equal('1') 
        addTodoList._id.should.be.equal(addTodoList._id) 
    })

    it('Should update a todolist', async () => {
        const up = await todoListModel.addTodoListModel({
            title: "Todolist 1",
            listID: "2",
        })
        let id = up._id
        let todolist = {
            title: "Todolist 3",
        }
        const updateTodolist = await todoListModel.editTodoListModel(id, todolist)
        updateTodolist.ok.should.equal(1) //1 = true, how many posts u have edited
    })

    it('Should delete a todolist', async () => {
        const del = await todoListModel.addTodoListModel({
            title: "Todolist 1",
            listID: "2",
        })
        let id = del._id

        const deleteTodolist = await todoListModel.deleteTodoListModel(id)
        deleteTodolist.ok.should.equal(1) //1 = true, how many posts u have edited
    })

})