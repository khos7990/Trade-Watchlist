import  { Component } from 'react'
import Button from '@material-ui/core/Button';
import "./Logout.css"





export default class Logout extends Component {
    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.setUserInState(null)
    }

  render() {
    return (
      <div className='logoutBtn'>
      <Button type='submit' variant='contained' color='secondary' onClick={this.handleLogout}>Logout</Button>
    
    </div>
    )
  }
}
