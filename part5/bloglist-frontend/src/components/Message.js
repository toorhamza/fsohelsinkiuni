import React from "react";
import '../index.css'

const Message = (props) => {
    const success = <div className="success">{props.Message.message}</div>
    const error = <div className="error">{props.Message.message}</div>

    if(props.Message.message !== '') {
        return(
            props.Message.type === 'success' ? success : error
        )
    } else {
        return null
    }
}

export default Message;