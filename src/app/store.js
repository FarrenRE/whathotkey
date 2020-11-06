import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'
import keysReducer from '../features/keys/keysSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    keys: keysReducer
  }
})
