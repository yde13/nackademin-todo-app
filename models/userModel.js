const db = require('../database/userDatabase.js');

async function getUserModel(username){

    const user = await db.findOne({ username: username })
    return user;
    
}

function postUserModel(credentials){
    return new Promise(async(resolve, reject) => {

        try {
            const insert = await db.insert(credentials);
            resolve(insert);
        } catch (error) {
            reject(error)
        }
    })
}

function editUserModel(id, user) {
    return new Promise(async(resolve, reject) => {

        try {

            const post = await db.update({_id :id},{ $set: user });
            console.log(post + " user");

            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteUserModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await db.remove({_id : id});
            console.log(removed + " post");

            resolve(removed);
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {
    getUserModel,
    postUserModel,
    editUserModel,
    deleteUserModel
}