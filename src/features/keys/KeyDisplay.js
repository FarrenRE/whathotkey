import React from 'react'
import { useSelector } from 'react-redux'

export const KeyDisplay = () => {

  const activeKey = useSelector(state => state.keys.activeKey)

  return (
    <section>
      Active key: { activeKey }
    </section>
  )
}