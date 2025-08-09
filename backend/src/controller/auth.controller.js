const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



async function registerController(req,res) {
    const { name, username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ username })
    
    if (isUserAlreadyExist) {
        return res.status(400).json({message:"user already exist"})
    }

    const isEmailExist = await userModel.findOne({ email })
    
    if (isEmailExist) {
        return res.status(400).json({message:"email already exist"})
    }

    const user = await userModel.create({
        name,
        username,
        email,
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token)
    

    res.status(200).json({
        message: "user created successfully",
        user
    })
}

async function loginController(req,res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if (!user) {
        return res.status(400).json({
            message:"email is not verified register first"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "password incorrect"
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(200).json({
        message: "login successfully",
        user: {
            email: user.email,
            id:user._id
            
        }
        
    })
}




module.exports = {
    registerController,
    loginController
}