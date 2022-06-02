import { createSlice } from "@reduxjs/toolkit"
const initialState = "hei"
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers:{
        addNotification(state, action) {
            state.replace(
                action.payload
            )
        }
    }

})
export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer