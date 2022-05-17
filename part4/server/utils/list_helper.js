const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum =  blogs.reduce(((total, blog) => {return total + blog.likes}), 0)
    return sum
}

module.exports = { dummy, totalLikes }