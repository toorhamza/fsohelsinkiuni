import React from 'react'

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const result = store.getState().notification

  

  return (
    <div style={style}>
      {result !== "" ? result : null}
    </div>
  )
}

export default Notification