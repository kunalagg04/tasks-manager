const mongoose = require('mongoose')
const validator = require('validator')

//here we integrate db name in url 
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    useCreateIndex : true
});

//we define a model for a collection in mongoose
const User = mongoose.model('User',{
    name : {
         type : String,
         required : true,

         
    },

    email : {
        type : String,
        required : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Unvalid Email")
            }
        }
    
    },

    age : {
        type : Number,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },

    password :{
        type: String,
        required: true,
        minlength : 6,
        trim : true ,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new ERROR('Choose another password')
            }
        }
        
    }

    //https://mongoosejs.com/docs/schematypes.html --> contains info about all types of allowed props like type , minlength etc.
    
})

const me = new User({ 
    name : "Kunal",
    age :  18,
    email : "kunal@gmail.com",
    password : "Password04"
    
})

//to save "me"
me.save().then(() => {
   console.log(me)
}).catch((error) => {
   console.log(error)
})

//we use npm validator for validation purpose

//TASKS MODEL
//Tasks is stored as tasks( lower case letter)
const Task = mongoose.model('Task',{
    description : {
        type : String,
        required:true,
        trim: true

    },
    completed : {
        type : Boolean,
        default: false
    }
})

const task = new Task({
    description : "Hi",
    completed : true
})

// task.save().then(() => {
//     console.log(task)
//  }).catch((error) => {
//     console.log(error)
//  })
 