const taskModel = require('../../models/taskModel')
const db = require('../../database/database');
const mongoose = require('mongoose')
require('chai').should()

describe('Task', function() {
    before(async function () {
        await db.connect();
    });
    after(async function () {
        await db.disconnect();
    });
    beforeEach(() => {
        taskModel.clear()
    })

    it('Should get all todos', async () => {

        const task = {
            title: 'todo 1',
            done: false,
            created: '1998',
            urgent: false,
            listID: '1',
            createdBy: 'Hugo',
        }

        const result = await taskModel.addTaskModel(task)
        // console.log(result, 'no');

        const getTodos = await taskModel.getTaskModel()
        // console.log(getTodos, 'get todos');
        
        // getTodos.should.equal( //should.EQL eftersom det är arrays!
        //     {
        //         _id: result._id,
        //         title: 'todo 1',
        //         done: false,
        //         created: '1998',
        //         urgent: false,
        //         listID: '1',
        //         createdBy: 'Hugo',
        //         __v: result.__v
        //     }
        // )
     getTodos[0].title.should.be.equal('todo 1') 
     getTodos[0].done.should.be.equal(false) 
     getTodos[0].listID.should.be.equal('1') 
     getTodos[0].createdBy.should.be.equal('Hugo') 

    })

    it('Should get a single todo', async () => {
       const result = await taskModel.addTaskModel([{
        
            title: 'todo 2',
            done: true,
            created: '1993',
            urgent: false,
            listID: '1',
            createdBy: 'Philip',
        }
        ])

        let id = 'Philip'
        const getSingleTask = await taskModel.getSingleTaskModel(id)

        // getSingleTask.should.eql( //should.EQL eftersom det är arrays!
        //     [{
        //         title: 'todo 2',
        //         done: true,
        //         created: '1993',
        //         urgent: false,
        //         listID: '1',
        //         createdBy: 'Philip',
        //         _id: '2'

        //     }])
        getSingleTask[0].title.should.be.equal('todo 2') 
        getSingleTask[0].done.should.be.equal(true) 
        getSingleTask[0].listID.should.be.equal('1') 
         getSingleTask[0].createdBy.should.be.equal('Philip') 


    })

    it('Should add a todo', async () => {
        const todo = {
            title: "Diska",
            done: true,
            created: "2020-03-12",
        }
        const addTodo = await taskModel.addTaskModel(todo)
        // addTodo.should.eql({
        //     title: "Diska",
        //     done: true,
        //     created: "2020-03-12",
        //     _id: addTodo._id
        // })
        addTodo.title.should.be.equal("Diska") 
        addTodo.done.should.be.equal(true) 
        addTodo.created.should.be.equal('2020-03-12') 
    })

    it('Should update a todo', async () => {
       const s = await taskModel.addTaskModel({
            title: "Tvätta",
            done: false,
            created: "2020-04-24",
        })
        let id = s._id        
        let todo = {
            title: 'Tvätta',
            done: true,
            created: "2020-04-24",

        }
        const updateTodo = await taskModel.editTaskModel(id, todo)
        
        // updateTodo[0].title.should.be.equal('Tvätta') 

        updateTodo.ok.should.equal(1) //1 = true, how many posts u have edited
    })

    it('Should delete a todo', async () => {
        const s = await taskModel.addTaskModel({
            title: "Spela",
            done: false,
            created: "2020-04-24",
        })
        let id = s._id
        const deleteTodo = await taskModel.deleteTaskModel(id)
        deleteTodo.ok.should.equal(1) //1 = true
    })

})