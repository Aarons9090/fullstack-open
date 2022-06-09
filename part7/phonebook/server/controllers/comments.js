const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
require("express-async-errors")
require("../utils/middleware")
const jwt = require("jsonwebtoken")
const { userExtractor } = require("../utils/middleware")

commentsRouter.get("/:id/comments", async (request, response) => {
    const comments = await Comment.find(com => com.blog_id === request.params.id).populate("user", {username: 1, name: 1, id:1})
    response.json(comments)
})

commentsRouter.post("/:id/comments", userExtractor, async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id){
        return response.status(401).json({error: "token invalid"})
    }

    const user = request.user
    console.log(request.params.id)
    const comment = new Comment({
        comment: body.comment,
        user: user._id,
        blog_id: request.params.id
    })

    const savedComment = await comment.save()
    response.status(201).json(savedComment)
})

module.exports = commentsRouter