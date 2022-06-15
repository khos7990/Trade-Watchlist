import React from 'react'
import './Input.css';







export default function Inputs(props) {
  return (
    <div>

   
        Trading Pair<input className='Pair' name="pair" value={props.name} onChange={props.onChange}></input>
        <button onClick={props.onClick}> Submit</button>

  </div>
  )
}
