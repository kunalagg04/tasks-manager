const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/user', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/users/me', auth , async (req,res) => {
    // User.find({ }).then((users) => {
    //    res.send(users)
       
    //     res.send(error)
    // })
    res.send(req.user)
})

// router.get('/users/:id' , async (req,res) => {
//     try {
//         const _id = req.params._id
//         const user = await User.findById(_id)
//         res.send(user)
//     } catch(e) {
//         res.send(e)
//     }
// })

router.post('/users/login' ,  async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user : user.getPublicProfile() ,token})
    } catch(e){
        res.status(203).send(e) 

    }
})
   

    // // console.log(req.params)
    // const _id = req.params._id
    // //it converts string id to object id automatically
    // User.findById(_id).then((user) => {
    //      res.send(user)
    // }).catch((error) => {
    //     res.send(error)
    // })


router.patch('/users/:id' , async (req,res) => {

    const updates = Object.keys(req.body)
    // console.log(updates)

    try {

        //findbyidandupdate doesnnot allow midleware to work that's why we are not using it
        // const user = await User.findByIdAndUpdate( req.params.id , req.body , { new : true , runValidators : true } )
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            //doubt -> why []
            // console.log(update)
            // console.log([update])
            // console.log(user['email'])
            // console.log(user.update)
            // console.log(user[update])
              user[update] = req.body[update]
        })

        await user.save()

        if (!user){
            return res.status(201).send('user not found')
        }
        res.send(user)
    } catch(e) {
        res.status(205).send(e)
    }
})

router.delete('/users/me', auth , async (req,res) => {
    // try{
    //     const r = await User.remove({ _id : req.user._id})
    //     res.send(r.deletedCount)
    // } catch(e){
    //     res.status(201).send(e)
    // }

    try{
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
})

router.post('/users/logout' , auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    }
    catch (e) {
        res.status(500).send()
    }
})

 



module.exports = router
