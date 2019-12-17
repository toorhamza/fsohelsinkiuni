import React from 'react'

const Total = (props) => {
    
    const calc = props.exercises1 + props.exercises2 + props.exercises3

    return (
        <>
        <p>Number of exercises {calc}</p>
</>
    )
}

export default Total;