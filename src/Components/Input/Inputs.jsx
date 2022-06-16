import React from 'react'
import Button from '@material-ui/core/Button';
import './Input.css';







export default function Inputs(props) {
  return (
    <div>

   
        Trading Pair<input className='Pair' name="pair" value={props.name} onChange={props.onChange}></input>
        <Button type='submit' variant='outlined' color='inherit' onClick={props.onClick}> Submit</Button>

  </div>
  )
}
