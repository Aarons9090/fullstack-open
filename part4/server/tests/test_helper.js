const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
        "author": "Matti Kunnas",
        "title": "Blogi avaruudesta",
        "url": "www.netti.fi",
        "likes": 20

    },
    {
        "author": "Kim yong Un",
        "title": "Hallitsemisen riemut",
        "url": "www.cccp.fi",
        "likes": 0
    
    }
    
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}


module.exports = {
    initialBlogs, blogsInDb, usersInDb
}
