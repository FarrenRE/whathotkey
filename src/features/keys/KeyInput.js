import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { activeKeyUpdated } from './keysSlice'

import styles from './KeyInput.module.scss'

export const KeyInput = () => {

  const dispatch = useDispatch()

  const [activeKeyInput, setActiveKeyInput] = useState('')
  const [activeModifiers, setActiveModifiers] = useState([])

  const handleKeyDown = (e) => {
    e.preventDefault()
    console.log(`e.key: ${e.key}`)
    const keyPressed = e.key
    let keyModifiers = []
    if( e.ctrlKey ) { keyModifiers.push('Control') }
    if( e.altKey ) { keyModifiers.push('Alt') }
    if( e.shiftKey ) { keyModifiers.push('Shift') }
    // exception: if e.key is a modifier key, remove from array
    if( keyModifiers.find( key => key === e.key ) ) {
      // console.log('Exception, your honour!')
      keyModifiers = keyModifiers.filter( m => m !== e.key )
    }
    console.log(keyModifiers)
    // update state
    setActiveKeyInput(keyPressed)
    setActiveModifiers(keyModifiers)
    // dispatch update
    dispatch(
      activeKeyUpdated({ 
        newActiveKey: keyPressed,
        newActiveKeyModifiers: keyModifiers  
      })
    )
  }

  const displayActiveKey = () => {
    let displayKeyValue = activeKeyInput
    if( activeKeyInput.length === 1 ) {
      displayKeyValue = activeKeyInput.toUpperCase()
    }
    if( activeKeyInput === ' ' ) {
      displayKeyValue = 'Spacebar'
    }
    return displayKeyValue
  }

  const displayActiveModifiers = () => {
    return activeModifiers.map(m=>m + ' + ').join('')
  }

  return (
    <section>
      <label>Type keys in the box below:</label>
      <input
        className={styles.input}
        type="text"
        onKeyDown={handleKeyDown}
        value={displayActiveModifiers() + displayActiveKey()} />
    </section>
  )
}