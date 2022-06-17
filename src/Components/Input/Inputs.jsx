import React from 'react'
import Button from '@material-ui/core/Button';
import './Input.css';
import { InputAdornment, InputBase, InputLabel, TextField } from '@material-ui/core';







export default function Inputs(props) {
  return (
    <div className='whatever'>

   
       <TextField variant='outlined' className='Pair' name="pair" value={props.name} onChange={props.onChange} autoComplete='off' label='Enter a TradingPair'></TextField>
        <br/>
        <Button type='submit' variant='outlined' color='inherit' onClick={props.onClick}> Submit</Button>

  </div>
  )
}
