import React from 'react'
import { useSelector } from 'react-redux'

// Now, we need a way to show the name of the post's author inside of our post list
// items and <SinglePostPage>. Since we want to show this same kind of info in more
// than one place, we can make a PostAuthor component that takes a user ID as a prop,
// looks up the right user object, and formats the user's name:
export const PostAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

// Notice that we're following the same pattern in each of our components as we go. Any
// component that needs to read data from the Redux store can use the useSelector hook, and
// extract the specific pieces of data that it needs. Also, many components can access the
// same data in the Redux store at the same time.

export default PostAuthor
