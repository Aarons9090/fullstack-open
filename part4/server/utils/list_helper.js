const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = blogs.reduce(((total, blog) => { return total + blog.likes }), 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    let favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
    const arrayOfAuthors = blogs.map((blog) => { return blog.author })
    return _.head(_(arrayOfAuthors)
        .countBy()
        .entries()
        .maxBy(_.last))
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }