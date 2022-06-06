import express from "express";
import {
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals
} from "../controller/goalController.js"

const router = express.Router()

router.route('/').get(getGoals).post(setGoals)
router.route("/:id").put(updateGoals).delete(deleteGoals)

export default router;