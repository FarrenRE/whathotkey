import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'

import { keybindAdded } from './keysSlice'

export const AddKeybindForm = () => {

  const activeKey = useSelector(state => state.keys.activeKey)

  const [content, setContent] = useState('')
  // const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  // const users = useSelector(state => state.users)

  const onContentChanged = e => setContent(e.target.value)
  // const onAuthorChanged = e => setUserId(e.target.value)

  const onSavePostClicked = () => {
    if (content) {
      dispatch(
        keybindAdded(activeKey, content)
      )
      setContent('')
    }
  }

  // //  a bit of validation logic to our form so that the user can only click the 
  // // "Save Post" button if the title and content inputs have some actual text in them
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  // const usersOptions = users.map(user => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))

  return (
    <section>
      <h2>Add a Keybind</h2>
      <form>
        {/* <label htmlFor="postAuthor">App:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Description:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} /*disabled={!canSave}*/>Save Keybind</button>
      </form>
    </section>
  )
}