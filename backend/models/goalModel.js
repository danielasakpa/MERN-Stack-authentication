import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, 'please add a goal'],
    }
    
},
{
  timestamps: true,
 });

const Goal = mongoose.model("Goal", goalSchema)

export default Goal;