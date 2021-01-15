import React, { useState, useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button style={{margin: "20px"}} color="primary" variant="contained" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button style={{margin: "20px"}} color="primary" variant="contained" onClick={toggleVisibility}>cancel</Button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable