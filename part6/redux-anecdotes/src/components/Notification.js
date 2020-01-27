import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const result = props.notification

  

  return (
    <div style={style}>
      {result !== "" ? result : null}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification

  }
}

export default connect(mapStateToProps)(Notification)