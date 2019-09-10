const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/tasks')
const router = new express.Router()

router.post('/tasks', auth , async (req, res) => {

    const task = new Task({
        ...req.body,
        //req.user form auth middleware
        owner : req.user._id
    })
    try {
        const t = await task.save()
        res.send(t)
    } catch(e){
        res.send(e)
    }

    // const task = new Task(req.body)
    // task.save().then((t) => {
    //     res.send(t)
    // }).catch((error) => {
    //     res.status(400).send(error)
    //     console.log(error)
    // })
})

//to get list of tasks of an owner either we can find tasks by "owner" property of list
//we can use populate method
 router.get('/tasks', auth, async (req,res) => {
    try {
        // const tasks = await Task.find({ owner : req.user._id })
        // res.send(tasks)
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
        
    } catch(e) { 
         res.status(201).send(e)
    }
 })

 router.get('/tasks/:id' , auth , async ( req,res) => {
     const id = req.params.id
     try {
         const task = await Task.findOne({ _id : id , owner : req.user._id})
         if(!task){
             return res.status(404).send()
         }
         res.send(task)
     }
     catch(e){
         res.status(500).send()
     }
 })
 //we can create delete route similarly 

 module.exports = router