const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
         type : String,
         required : true,

         
    },

    email : {
        type : String,
        unique: true,
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
        
    },

    //we need to store tokens for user to ensure login
    //tokens is an array of token objects
    tokens : [{
        token:{
            type: String,
            required: true

        }
    }]

    //https://mongoosejs.com/docs/schematypes.html --> contains info about all types of allowed props like type , minlength etc.
    
},{
    timestamps : true
})

//mongoose converts model into schema
//if we want to use middleware for purpoes like using bcrypt
//we need to store object as schema and pass that scheme to user

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user

}

userSchema.methods.getPublicProfile = function () {
    const user= this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//generating jwt
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({ _id : user._id.toString() }, 'hibc')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save' , async function(next){
    //no arrow func bcoz we want binding
    //whatever code is run here will be executed before saving user
    //however this method is bypassed by some mongoose queries like findonandupdate. So we need to be careful
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    //next tells nodeJS that this func is completed and now it can proceed with it's task here--> save
    next()

})

const User = mongoose.model('User', userSchema)

module.exports = User;