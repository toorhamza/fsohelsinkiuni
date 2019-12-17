import React from 'react'

const Total = (props) => {
    console.log(props)
    const calc = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

    return (
        <>
        <p>Number of exercises {calc}</p>
</>
    )
}

export default Total;