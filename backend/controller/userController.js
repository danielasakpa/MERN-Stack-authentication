import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

//@desc Register new user
//@route POST /api/user
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("please fill in  all fields")
    }
    
    //Check if the user exists
    
    const userExists = await User.findOne({email})
    
    if(userExists) {
        res.status(400)
        throw new Error("user already exists")
    }
    
    //Hash password
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create user
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    
    if(user) {
        res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

//@desc Authenticate a user
//@route POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    //Check for user email
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user credentials')
    }
    
})

//@desc Get user data
//@route GET /api/user/me
// @access private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//Generate a JWT Token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })
}


export {registerUser, loginUser, getMe}