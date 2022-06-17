import { Component } from 'react'
import { Container, Typography } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import  TextField from '@material-ui/core/TextField'
import './Login.css'


export default class Login extends Component {
  
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await fetch('/users/login', {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: this.state.email, password: this.state.password})
      })
  
      if (!userResponse.ok) throw new Error('Auth Failed, Please try again later')
  
      let token = await userResponse.json()
      localStorage.setItem('token', token);
  
      const userInfo = JSON.parse(atob(token.split('.')[1])).user;
      this.props.setUserInState(userInfo)
    } catch (err) {
    }
  }




  render() {
    return (
        <Grid Container spacing={3}>
        <Grid item xs={2}>
      <div className='Login'>

        <Typography variant='h2'> Login </Typography>
  
        <form autoComplete='off' onSubmit={this.handleSubmit}>
            <TextField  className='loginInp' variant='outlined' name="email" value={this.state.email} onChange={this.handleChange} type='email' label='Email' required></TextField>
             <TextField className='loginInp' variant='outlined' name="password" value={this.state.password} onChange={this.handleChange} type='password' label='Password' required ></TextField>
            <Button type='submit' variant='contained' color='primary'>Login</Button>
        </form>
      </div>
        </Grid>

      </Grid>
    )
  }
}

