import  { Component } from 'react'
import "./Logout.css"





export default class Logout extends Component {
    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.setUserInState(null)
    }

  render() {
    return (
      <div className='logoutBtn'>
      <button onClick={this.handleLogout}>Logout</button>
    
    </div>
    )
  }
}
