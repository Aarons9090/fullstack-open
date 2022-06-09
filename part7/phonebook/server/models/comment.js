const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blog_id: mongoose.Schema.Types.ObjectId
})

commentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})
  
const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment