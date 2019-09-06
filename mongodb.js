//CRUD

//mongodb is a driver for handling mongodb 
const mongodb = require('mongodb')

//required for getting access to db
const MongoClient = mongodb.MongoClient

const ObjectID = mongodb.ObjectID

const id = new ObjectID()
console.log(id.id)
console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

//to connect to db 
// MongoClient.connect( connectionURL , { useNewUrlParser : true } , (error , client) => {

//     if(error){
//         return console.log("Error")
//     }

//     // return console.log("Connected")

//     //we can now make manipulations via db
//     const db =  client.db(databaseName)
    

//     // a single connection contains info about a single type pf data eg: users , notes etc.
//     //insertOne is asynchronous
//     db.collection('users').insertOne({
//         _id : id,
//         name : 'Kaun',
//         age : 17
//     } , (error , result) => {
//         if(error){
//             return console.log("unablle to insert user")
//         }
//         console.log(result.ops)
//     })

 
//     //use insertMany to insert multiple users at a time . use array of objects for that
//     db.collection('tasks').insertMany([
//         {
//             title : "ReactJS",
//             completed :  true
//         },
//         {
//             title: "NodeJs",
//             completed : true
//         }
//     ] , 
//     (error , result) => {
//         if(error) {
//             return console.log("Error --> Task not added")
//         }

//         console.log(result.ops)
//     })

// })


MongoClient.connect( connectionURL , { useNewUrlParser : true } , (error , client) => {
            if(error){
                return console.log("Error")
            }

            const db =  client.db(databaseName)

            db.collection('users').findOne({ name : 'Kunal' , age : 4} , (error , user) => {
                if(error){
                    return console.log("user not fetched")
                }

                console.log(user)
            })

            //If we have to search by objectid then we have to wrp the id by a function because actually objectid is not stored as it is displyed.
            db.collection('users').findOne({ _id : new ObjectID("5d6ac7afe19510218828e955")} , (error , user) => {
                console.log(user)
            })
 
            //in callback func of find it doesnt return an array of all objects instead returns a cursor ( pointer of required collection data)
            //toarray converts cursor to an array of matching collection data
            db.collection('users').find({ name : "Kunal" }).toArray((error,cursor) => {
                console.log(cursor)
            })

            //returns total no. of matching colllection data
            // db.collection('users').find({ name : "Kunal" }).count((error,cursor) => {
            //     console.log(cursor)
            // })

            //TO UPDATE VALUE:
            // WE WILL USE PROMISES.

            db.collection('users').updateOne({ name : 'Kunal' },
               {
                   $set : {
                       name : "Mike"
                   }
               }
            ).then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            })


            //use updateMany for changing multiple data value.
            db.collection('users').updateOne({ name : 'Kunal' },
               {
                   $inc : {
                       age : 1
                   }
               }
            ).then((result) => {
                console.log(result.modifiedCount)
            }).catch((error) => {
                console.log(error)
            })

})