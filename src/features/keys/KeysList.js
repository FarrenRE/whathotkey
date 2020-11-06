import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import Mousetrap from 'mousetrap' // https://craig.is/killing/mice

import { activeKeyUpdated } from './keysSlice'

import styles from './KeysList.module.scss'

export const KeysList = () => {
  const keys = useSelector(state => state.keys)

  const dispatch = useDispatch()

  const [activeKey, setActiveKey] = useState('Press a key!')

  const onKeyClicked = (e) => {
    setActiveKey(e.target.id)
    dispatch(
      activeKeyUpdated({nextKeyId: e.target.id})
    )
  }

  function renderKeyRow(rowNumber) {
    const renderedKeys = keys.map(key => (

      ( key.row === rowNumber 
        ? renderKey(key)
        : '' )
    ))
    return renderedKeys
  }

  function renderKey(keyProps) {
    const keyClassNames = classNames(
      styles.key,
      { [styles.active]: keyProps.active }
    )
    return (
      <span
        className={keyClassNames}
        id={keyProps.id}
        key={keyProps.id}
        onClick={onKeyClicked}>
          {keyProps.name}
      </span>
    )
  }

  function testMousetrap() {
    Mousetrap.bind(['ctrl+k'], function(e) {
      console.log('u pressed ctrl+k');
    })
  }

  return (
    <section>
      <h2>Keys</h2>
      <button onClick={testMousetrap}>Test Mousetrap</button>
      <div className={styles.list}>
        <div className={styles.row}>
          {renderKeyRow(1)}
        </div>
        <div className={styles.row}>
          {renderKeyRow(2)}
        </div>
        <div className={styles.row}>
          {renderKeyRow(3)}
        </div>
        <div className={styles.row}>
          {renderKeyRow(4)}
        </div>
        <div className={styles.row}>
          {renderKeyRow(5)}
        </div>
      </div>
    </section>
  )
}