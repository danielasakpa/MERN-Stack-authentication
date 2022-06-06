import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please add a goal'],
    }
    
}, {
    timestemps: true
});

const Goal = mongoose.model("Goal", goalSchema)

export default Goal;