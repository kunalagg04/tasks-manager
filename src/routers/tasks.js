const express = require('express')
const Task = require('../models/tasks')
const router = new express.Router()

router.post('/tasks', async (req, res) => {

    const task = new Task(req.body)
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

 router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({ })
        res.send(tasks)
    } catch(e) { 
         res.status(201).send(e)
    }
 })

 module.exports = router