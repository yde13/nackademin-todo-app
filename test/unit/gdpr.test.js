// const gdprModel = require('../../models/gdprModel')
// const taskModel = require('../../models/taskModel')
// const todoListModel = require('../../models/todoListModel')
// const userModel = require('../../models/userModel')
// const db = require('../../database/database');



// require('chai').should()

// describe('GDPR', () => {
//     before(async function () {
//         await db.connect();
//     });
//     after(async function () {
//         await db.disconnect();
//     });
//     beforeEach(() => {
//         taskModel.clear()
//         todoListModel.clear()
//         userModel.clear()
//     })

//     it('Should get everything', async () => {
//         let password = 'philip'

//         await taskModel.addTaskModel(
//             {
//                 title: 'todo 1',
//                 done: true,
//                 created: '1998',
//                 urgent: false,
//                 listID: '1',
//                 createdBy: '321',
//             })
//         await todoListModel.addTodoListModel({
//             title: "list 1",
//             listID: '1',
//         })
//         // await userModel.postUserModel({
//         //     username: 'Philip',
//         //     password: password,
//         //     role: 'User',
//         //     _id: '123'
//         // })
//         // const success = bcrypt.compareSync( password, credentials.password)


//         const getEverything = await gdprModel.getGdprModel()
//         console.log(getEverything.title);
        
//         getEverything['lists'].should.be.equal("list 1") 
//         getEverything['lists']._id.should.be.equal(getEverything['lists']._id) 

//         getEverything['tasks'].title.should.be.equal(getEverything['tasks'].title) 
//         getEverything['tasks'].created.should.be.equal(getEverything['tasks'].created) 


//         // getEverything.should.eql(
//         //     {
//         //         "lists": [
//         //             {
//         //                 listID: getEverything['lists']._id,
//         //                 title: "list 1",
//         //                 _id: '1'
//         //             }
//         //         ],
//         //         "tasks": [
//         //             {
//         //                 _id: getEverything['tasks']._id,
//         //                 created: "1998",
//         //                 createdBy: "321",
//         //                 done: true,
//         //                 listID: "1",
//         //                 title: "todo 1",
//         //                 urgent: false,
//         //             }
//         //         ],
//         //         "users": []
//         //         // {
//         //         //     username: 'Philip',
//         //         //     password: 'hej',
//         //         //     role: 'User',
//         //         //     _id: '123'
//         //         // } här fuckar det för att det är strul med ohashat lösen

//         //     })
//     })

//     it('Should get everything about an account', async () => {
//         await taskModel.addTaskModel(
//             {
//                 title: 'todo 2',
//                 done: false,
//                 created: '1998',
//                 urgent: false,
//                 listID: '1',
//                 createdBy: '123',
//                 _id: '2'
//             })
//         await todoListModel.addTodoListModel(
//             {
//                 title: "list 1",
//                 listID: '1',
//                 createdBy: '123',
//                 _id: '1'
//             },
//             {
//                 title: 'list 2',
//                 listID: '2',
//                 createdBy: '321',
//                 _id: '2'
//             })
//             //users behövs testas också

//         let id = '123'
//         const getSingleGdpr = await gdprModel.getSingleGdprModel(id)

//         getSingleGdpr.should.eql( //should.EQL eftersom det är arrays!
//             {
//                 "users": [],

//                 "tasks": [
//                     {
//                         title: 'todo 2',
//                         done: false,
//                         created: '1998',
//                         urgent: false,
//                         listID: '1',
//                         createdBy: '123',
//                         _id: '2'
//                     }
//                 ],
//                 "lists": [
//                     {
//                         title: "list 1",
//                         listID: '1',
//                         createdBy: '123',
//                         _id: '1'
//                     }
//                 ]

//             })

//     })

//     // it('Should delete everything on an account', async () => {
//     //     await taskModel.addTaskModel(
//     //         {
//     //             title: 'todo 2',
//     //             done: false,
//     //             created: '1998',
//     //             urgent: false,
//     //             listID: '1',
//     //             createdBy: '123',
//     //             _id: '2'
//     //         })
//     //     await todoListModel.addTodoListModel(
//     //         {
//     //             title: "list 1",
//     //             listID: '1',
//     //             createdBy: '123',
//     //             _id: '1'
//     //         },
//     //         {
//     //             title: 'list 2',
//     //             listID: '2',
//     //             createdBy: '321',
//     //             _id: '2'
//     //         })
//     //         // await userModel.postUserModel({
//     //         //         username: 'Philip',
//     //         //         password: 'password',
//     //         //         role: 'User',
//     //         //         _id: '123'
//     //         //     })
//     //     let id = '123'
//     //     const deleteTodo = await gdprModel.deleteGdprModel(id)
//     //     deleteTodo.should.equal(1) //1 = true
//     // })

// })