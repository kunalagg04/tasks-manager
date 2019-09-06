const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/user', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', async (req,res) => {
    // User.find({ }).then((users) => {
    //    res.send(users)
       
    //     res.send(error)
    // })

    try {
        const users = await User.find({ })
        res.send(users)
    } catch(e) { 
         res.status(201).send(e)
    }
})

router.get('/users/:id' , async (req,res) => {
    try {
        const _id = req.params._id
        const user = await User.findById(_id)
        res.send(user)
    } catch(e) {
        res.send(e)
    }
   

    // // console.log(req.params)
    // const _id = req.params._id
    // //it converts string id to object id automatically
    // User.findById(_id).then((user) => {
    //      res.send(user)
    // }).catch((error) => {
    //     res.send(error)
    // })
})

router.patch('/users/:id' , async (req,res) => {
    try {
        const user = User.findByIdAndUpdate( req.params.id , req.body , { new : true , runValidators : true } )
        if (!user){
            return res.status(201).send('user not found')
        }
        res.send(user)
    } catch(e) {
        res.status(201).send(e)
    }
})

router.delete('/users' , async (req,res) => {
    try{
        const r = await User.remove({name : 'Kunal'})
        res.send(r.deletedCount)
    } catch(e){
        res.status(201).send(e)
    }
})



module.exports = router
