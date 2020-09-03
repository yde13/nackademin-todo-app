const db = require('../database/database.js');

async function getUserModel(username){
    try {
        const user = await db.users.findOne({ username: username })
        return user;
    } catch (error) {
        return error
    }
    
    
}

function postUserModel(credentials){
    return new Promise(async(resolve, reject) => {

        try {
            const insert = await db.users.insert(credentials);
            resolve(insert);
        } catch (error) {
            reject(error)
        }
    })
}

function editUserModel(id, user) {
    return new Promise(async(resolve, reject) => {

        try {

            const post = await db.users.update({_id :id},{ $set: user });
            // console.log(post + " user");

            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
}

function deleteUserModel (id) {

    return new Promise(async(resolve, reject) => {
        try {

            const removed = await db.users.remove({_id : id});
            // console.log(removed + " post");

            resolve(removed);
        } catch (error) {
            reject(error);
        }
    });
}

function clear () {
    db.users.remove({})
}



module.exports = {
    getUserModel,
    postUserModel,
    editUserModel,
    deleteUserModel,
    clear
}