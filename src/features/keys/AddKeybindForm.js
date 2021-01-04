import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'

import { keybindAdded } from './keysSlice'

export const AddKeybindForm = () => {

  const activeKey = useSelector(state => state.keys.activeKey)

  const [content, setContent] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)

  const dispatch = useDispatch()

  const onContentChanged = e => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (content) {
      dispatch(
        keybindAdded(activeKey, content)
      )
      setContent('')
      setCanSubmit(false)
    }
  }

  const onEditButtonClicked = () => {
    setCanSubmit(true)
  }

  return (
    <section>
      <h2>Add a Keybind</h2>
      <form>
        <label htmlFor="postContent">Description:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onEditButtonClicked} disabled={canSubmit}>Edit</button>
        <button type="button" onClick={onSavePostClicked} disabled={!canSubmit}>Save Keybind</button>
      </form>
    </section>
  )
}