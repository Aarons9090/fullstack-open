import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import allUsersReducer from "./reducers/allUsersReducer"

export const store = configureStore({
    reducer:{
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        allUsers: allUsersReducer
    }
})