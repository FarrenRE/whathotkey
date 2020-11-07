import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { activeKeyUpdated } from './keysSlice'

import styles from './KeyInput.module.scss'

export const KeyInput = () => {

  const dispatch = useDispatch()

  const [activeKeyInput, setActiveKeyInput] = useState({})
  const [activeModifiers, setActiveModifiers] = useState([])

  const handleKeyDown = (e) => {
    e.preventDefault()

    // sanitise input and handle exceptions
    const parsedKey = () => {
      if( e.key === ' ' ) {
        return 'Spacebar'
      }
      else if( 48 <= e.keyCode && e.keyCode <= 57 ) { // coerce shift + number key into number key instead of alt char
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
      metaKey: e.metaKey
    }
    console.log(keypressData)

    // record modifiers (Ctrl/Alt/Shift)
    let keyModifiers = []
    if( e.ctrlKey ) { keyModifiers.push('Control') }
    if( e.altKey ) { keyModifiers.push('Alt') }
    if( e.shiftKey ) { keyModifiers.push('Shift') }
    // exception: if e.key is a modifier key, remove from array
    if( keyModifiers.find( key => key === e.key ) ) {
      keyModifiers = keyModifiers.filter( m => m !== e.key )
    }
    // update state
    setActiveKeyInput(keypressData)
    setActiveModifiers(keyModifiers)
    // dispatch update
    dispatch(
      activeKeyUpdated({ 
        newActiveKey: keypressData,
        newActiveKeyModifiers: keyModifiers  
      })
    )
  }

  const displayActiveKey = () => {
    let displayKeyValue = activeKeyInput.key || ''
    if( displayKeyValue.length === 1 ) {
      displayKeyValue = displayKeyValue.toUpperCase()
    }
    if( displayKeyValue === ' ' ) {
      displayKeyValue = 'Spacebar'
    }
    return displayKeyValue
  }

  const displayActiveModifiers = () => {
    return activeModifiers.map(m=>m + ' + ').join('')
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
        value={displayActiveModifiers() + displayActiveKey()} />
        <label>Try some hotkeys!</label>
    </section>
  )
}