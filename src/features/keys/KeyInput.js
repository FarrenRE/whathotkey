import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { activeKeyUpdated } from './keysSlice'

import styles from './KeyInput.module.scss'

export const KeyInput = () => {

  const dispatch = useDispatch()

  const [activeKeyInput, setActiveKeyInput] = useState('')

  const handleKeyDown = (e) => {
    e.preventDefault()
    console.log(`e.key: ${e.key}`)
    console.log(`e.which: ${e.which}`)
    console.log(`e.shiftKey: ${e.shiftKey}`)
    console.log(`e.ctrlKey: ${e.ctrlKey}`)
    console.log(`e.altKey: ${e.altKey}`)
    console.log(`e.metaKey: ${e.metaKey}`)
    const keyPressed = e.key
    setActiveKeyInput(keyPressed)
    dispatch(
      activeKeyUpdated({ nextKeyId: keyPressed })
    )
  }

  return (
    <section>
      <h2>Key input</h2>
      <input className={styles.input} type="text" onKeyDown={handleKeyDown} value={activeKeyInput} />
    </section>
  )
}