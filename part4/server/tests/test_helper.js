const Blog = require("../models/blog")

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

const contentInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJson())
}


module.exports = {
    initialBlogs, contentInDb
}
