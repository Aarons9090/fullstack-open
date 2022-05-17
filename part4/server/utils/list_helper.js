const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum =  blogs.reduce(((total, blog) => {return total + blog.likes}), 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    
    let favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return favorite
}

module.exports = { dummy, totalLikes, favoriteBlog }