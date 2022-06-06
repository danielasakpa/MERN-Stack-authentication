import asyncHandler from "express-async-handler"


//@desc Get goals
//@route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
})


//@desc Set goals
//@route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("please add a text field")
    }
    res.status(200).json({message: 'set goals'})
})

//@desc Update goals
//@route PUT /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
})

//@desc Delete goals
//@route DELETE /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
})

export {getGoals, setGoals, updateGoals, deleteGoals};