import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { activeKeyUpdated } from './keysSlice'

import styles from './KeyInput.module.scss'

export const KeyInput = () => {

  const dispatch = useDispatch()

  const [activeKeyInput, setActiveKeyInput] = useState({})

  const handleKeyDown = (e) => {
    e.preventDefault()

    // sanitise input and handle exceptions
    const parsedKey = () => {
      if( e.key === ' ' ) {
        return 'Spacebar'
      }
      // coerce shift + number key into number key instead of alt char
      else if( 48 <= e.keyCode && e.keyCode <= 57 ) { 
        return String.fromCharCode( e.keyCode ) 
      }
      else if( e.key.length === 1 ) {
        return e.key.toUpperCase()
      }
      else { return e.key }
    }
    const keypressData = {
      key: parsedKey(),
      which: e.which,
      keyCode: e.keyCode,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
    }
    keypressData.readableString = prepActiveKeyString(keypressData)
    console.log(keypressData)

    // update state
    setActiveKeyInput(keypressData)
    // dispatch update
    dispatch(
      activeKeyUpdated({ newActiveKey: keypressData })
    )
  }

  /**
   * Prepare a readable string for activeKey.readableString
   */
  const prepActiveKeyString = (keyData) => {
    let delimeter = ' + '
    let activeKeyString = ''
    let activeKeyModifiers = []

    // create array of active modifier keys
    if( keyData.ctrlKey ) {
      activeKeyModifiers.push('Ctrl')
    }
    if( keyData.altKey ) {
      activeKeyModifiers.push('Alt')
    }
    if( keyData.shiftKey ) {
      activeKeyModifiers.push('Shift')
    }
    // assemble readable string from active modifier array
    activeKeyString = activeKeyModifiers.map( (m)=> m ).join(delimeter)
    // if there's a modifier, append delimeter if there's also a key pressed
    const re = /(Shift|Alt|Control)/ // match modifier key as e.key value
    if( activeKeyModifiers.length > 0 && !keyData.key.match(re) ) {
      activeKeyString += delimeter
    }
    // uppercase any single letters, i.e. "a" -> "A"
    if( keyData.key.length === 1 ) {
      activeKeyString += keyData.key.toUpperCase()
    }
    // if e.key != modifier key, append to readable string
    else if (!keyData.key.match(re)) { 
      activeKeyString += keyData.key
    }
    return activeKeyString
  }

  const handleChange = () => {
    console.log('Change is scary.')
  }

  return (
    <section className={styles.section}>
      <input
        className={styles.input}
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={activeKeyInput.readableString} />
        <label>Try some hotkeys!</label>
    </section>
  )
}