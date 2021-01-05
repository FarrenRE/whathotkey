import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './EditKeybindForm.module.scss'
import { keybindAdded } from './keysSlice'


export const EditKeybindForm = (props) => {

  const activeKey = useSelector(state => state.keys.activeKey)

  // state to manage initial/edited description value
  const [content, setContent] = useState( props.description )

  const dispatch = useDispatch()

  const onDescriptionChanged = (e) => {
    setContent( e.target.value )
  }

  const onSavePostClicked = () => {
    if (content) {
      dispatch(
        keybindAdded(activeKey, content)
      )
    }
  }

  return (
    <section>
      <form className={styles.form}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={content}
          onChange={onDescriptionChanged}
        />
        <button type="button" onClick={onSavePostClicked}>Save</button>
      </form>
    </section>
  )
}

export default EditKeybindForm