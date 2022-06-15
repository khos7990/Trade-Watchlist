import  { Component } from 'react';
import './Auth.css';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';




export default class Auth extends Component {
    state = {
        showLogin: true
    }
  render() {
    return (
      <div className='authPage'>
        <button className='authBTN' onClick={() => this.setState({showLogin: !this.state.showLogin})}>
            {this.state.showLogin ? "Sign Up" : "Log In"}
        </button>

        {this.state.showLogin ? (<Login setUserInState = {this.props.setUserInState} />) 
        :
        (<Signup setUserInState={this.props.setUserInState}/>)}



      </div>
    )
  }
}
