const mongoose = require('mongoose')
const validator = require('validator')

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

module.exports = User;