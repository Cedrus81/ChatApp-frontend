import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
// ...

export const store = configureStore({
  reducer: {
    // Examples:
    user: userReducer
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// use this to get state
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// use this to dispatch actions
export type AppDispatch = typeof store.dispatch


