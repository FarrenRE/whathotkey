import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Simple Keyboard component: https://hodgef.com/simple-keyboard
import SimpleKeyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import { activeKeyUpdated } from './keysSlice'
import styles from './KeyInput.module.scss'
import { current } from '@reduxjs/toolkit'

export const KeyInput = () => {

  const dispatch = useDispatch()
  const inputLocked = useSelector(state => state.keys.inputLocked)
  const profileHotkeys = useSelector(state => state.keys.profile.hotkeys)

  const [activeKeyInput, setActiveKeyInput] = useState({})

  const mainInput = useRef(null) // for text input focus
  const keyboard = useRef() // for SimpleKeyboard component

  useEffect(() => {
    // focus text input
    mainInput.current.focus()

    // Test
    // keyboard.current.recurseButtons(buttonElement => {
    //   console.log('buttonElement', buttonElement.getAttribute('data-skbtn'))
    // })
    console.log('profileHotkeys')

    for(let hotkey of profileHotkeys) {
      console.log('hotkey:', hotkey)
      let profileKey = hotkey.key // profile hotkey, in lowercase      
      let boundKey = false
      
      if( profileKey.length === 1 ) {
        boundKey = keyboard.current.getButtonElement(profileKey.toUpperCase())
      }
      else if( profileKey.length === 2 ) { // function key
        console.log(profileKey)
        boundKey = keyboard.current.getButtonElement(`{${ profileKey.toUpperCase() }}`)
      } else { // named key
        console.log(profileKey)
        boundKey = keyboard.current.getButtonElement(`{${ profileKey.toLowerCase() }}`)
      }

      // If profile key is found on keyboard, add class
      if( boundKey ) {
        boundKey.classList.add('bound')
      }

    }

  })

  /**
   * @function handleKeyDown
   * @param {Event} e event object, used to determine which key is pressed (e.key)
   * @description input key handler. Update current key based on user input.
   */
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

    keypressData.readableString = getReadableString(keypressData)
    console.log(keypressData)

    // update keyboard
    changeButtonTheme(keypressData, 'active')
    // update state
    setActiveKeyInput(keypressData)
    // dispatch update
    dispatch(
      activeKeyUpdated({ newActiveKey: keypressData })
    )
  }

  /**
   * @function getReadableString
   * @param {Object} keyData contains active key values derived from e.key
   * @description Prepare a readable string for activeKey.readableString
   */
  const getReadableString = (keyData) => {
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

  /** TEST solution to un/controlled inputs warning */
  const handleChange = (e) => {
    console.log('handleChange()')
    console.log(e)
  }


  /*
    SimpleKeyboard methods -- consider isolating to new component 
  */

  /**
   * 
   * @param {Object} keyData active keyData
   * @param {String} theme class name
   */
  const changeButtonTheme = (keyData, theme) => {

    const buttonThemeButtons = transformKeypressData(keyData)

    keyboard.current.dispatch(
      instance => {
        instance.setOptions({
          buttonTheme: [{
            class: theme,
            buttons: buttonThemeButtons
          }]
        })
      }
    )

  }

  /**
   * @function transformKeypressData
   * @param {Object} keyData 
   * @description Transform keyData into buttonTheme string.
   */
  const transformKeypressData = (keyData) => {
    // parse meta keys and special cases
    let metaKeys = [];
    if( keyData.shiftKey ) { metaKeys.push('{shift}') }
    if( keyData.altKey ) { metaKeys.push('{alt}') }
    if( keyData.ctrlKey ) { metaKeys.push('{control}') }
    if( keyData.metaKey ) { metaKeys.push('{meta}') }
    if( keyData.key.toLowerCase() === 'spacebar' ) { metaKeys.push('{space}') }
    if( keyData.key.toLowerCase() === 'capslock' ) { metaKeys.push('{capslock}') }
    if( keyData.key.toLowerCase() === 'tab' ) { metaKeys.push('{tab}') }
    if( keyData.key.toLowerCase() === 'escape' ) { metaKeys.push('{escape}') }
    if( keyData.key.toLowerCase() === 'backspace' ) { metaKeys.push('{backspace}') }
    if( keyData.key.toLowerCase() === 'enter' ) { metaKeys.push('{enter}') }

    // handle function keys (f1, f2, ..., fn)
    if( keyData.key.match( /F\d{1,2}/ ) ) {
      keyData.key = `{${ keyData.key }}`
    }

    let result = `${ keyData.key } ${ metaKeys.join(' ') }`
    console.log(`Transformed keypressData: ${ result }`)
    return result
  }

  /**
   * @function highlightBoundKeys
   * @description Add theme to any key with an active binding.
   */
  const highlightBoundKeys = () => {

  }

  const keyboardOptions = {
    className: styles.test,
    display: {
      "{capslock}": "caps lock",
      "{shift}": "shift",
      "{control}": "ctrl",
      "{alt}": "alt",
      "{meta}": "meta",
      "{escape}": "esc",
      "{tab}": "tab",
      "{space}": "spacebar",
      "{enter}": "enter",
      "{backspace}": "backspace",
      "{F1}": "F1",
      "{F2}": "F2",
      "{F3}": "F3",
      "{F4}": "F4",
      "{F5}": "F5",
      "{F6}": "F6",
      "{F7}": "F7",
      "{F8}": "F8",
      "{F9}": "F9",
      "{F10}": "F10",
      "{F11}": "F11",
      "{F12}": "F12",
    },
    keyboardRef: r => (keyboard.current = r),
    layout: {
      default: [
        "{escape} {F1} {F2} {F3} {F4} {F5} {F6} {F7} {F8} {F9} {F10} {F11} {F12}",
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} Q W E R T Y U I O P [ ] \\",
        "{capslock} A S D F G H J K L ; ' {enter}",
        "{shift} Z X C V B N M , . /",
        "{control} {alt} {meta} {space}"
      ],
    },
    theme: "hg-theme-default test"
  }

  return (
      <>
      <section className={styles.section}>
        <div className={styles.keyboardWrapper}>
          <SimpleKeyboard
            {...keyboardOptions}
          />
        </div>
      </section>
      <section className={styles.section}>
        <input
          ref={mainInput}
          className={styles.input}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={activeKeyInput.readableString}
          disabled={inputLocked} />
          <label>^ Try some hotkeys! ^</label>
      </section>
    </>
  )
}