import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const initialState = []

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },

        setBlogs(state, action) {
            return action.payload
        },
    },
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const likeBlog = id => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const blogToLike = blogs.find(b => b.id === id)
        const likedBlogObj = { ...blogToLike, likes: blogToLike.likes + 1 }
        const newBlog = await blogService.updateBlog(id, likedBlogObj)

        dispatch(setBlogs(blogs.map(b => (b.id !== id ? b : newBlog))))
    }
}

export const removeBlog = id => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogService.removeBlog(id)
        dispatch(setBlogs(blogs.filter(b => b.id !== id)))
    }
}

export const addComment = (comment, id) => {
    return async dispatch => {
        await blogService.addComment(comment, id)
        const blogs = await blogService.getAll()

        dispatch(setBlogs(blogs))
    }
}

export default blogSlice.reducer
