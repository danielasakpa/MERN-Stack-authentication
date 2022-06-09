import asyncHandler from "express-async-handler"
import Goal from "../models/goalModel.js"
import User from "../models/userModel.js"


//@desc Get goals
//@route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id}).populate()
    
    res.status(200).json(goals)
})


//@desc Set goals
//@route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("please add a text field")
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    
    res.status(200).json(goal)
})

//@desc Update goals
//@route PUT /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error("goal not found")
    }
    
    //Check for user 
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    //Make sure the login user matchs the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user not authorized")
    }
    
    const updatededGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatededGoals)
})

//@desc Delete goals
//@route DELETE /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error("goal not found")
    }
    
    //Check for user 
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    //Make sure the login user matchs the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user not authorized")
    }
    
    await goal.remove()
    
    res.status(200).json({id: req.params.id})
})

export {getGoals, setGoals, updateGoals, deleteGoals};