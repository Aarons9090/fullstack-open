const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
require("express-async-errors")

usersRouter.get("/", async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post("/", async (request, response) => {
    const { username, name, password} = request.body
    if(!username || !password){
        return response.status(400).json({error: "login information missing"})
    }

    if(username.length <4 || password.length <4){
        return response.status(400).json({error: "username or password too short"})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})



module.exports = usersRouter