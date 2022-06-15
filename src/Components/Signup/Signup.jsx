
import { Component } from 'react'
import './Signup.css'

export default class Signup extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        confirm: ""
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
      }

handleSubmit = async (e) => {
    e.preventDefault() 
    if (e.target.password.value !== e.target.confirm.value) {
     throw new Error("Error passwords are not correct!") //how to display message to user
    }
    try {
        const userResponse = await fetch('/users/signup', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password})
        })

    if (!userResponse.ok) throw new Error ('Auth Failed - Please try again later')

    let token = await userResponse.json()
    localStorage.setItem('token', token);

    const userInfo = JSON.parse(atob(token.split('.')[1])).user
    this.props.setUserInState(userInfo)
    } catch (err) {
    
    }
}


  render() {
    return (
      <div>Signup 

          <form onSubmit={this.handleSubmit}>
            Enter Name: <input name="name" value={this.state.name} onChange={this.handleChange} placeholder='Name' required></input>
            Enter Email: <input name="email" value={this.state.email} onChange={this.handleChange} type='email' placeholder='Email' required></input>
            Enter Password: <input name="password" value={this.state.password} onChange={this.handleChange} type='password' placeholder='Password' required ></input>
            Confirm Password: <input name="confirm" value={this.state.confirm} onChange={this.handleChange} type='password' placeholder='Confirm' required ></input>
            <button>Sign Up</button>


          </form>





      </div>
    )
  }
}
