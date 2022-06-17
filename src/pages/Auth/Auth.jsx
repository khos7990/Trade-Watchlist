import { Component } from "react";
import "./Auth.css";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";

export default class Auth extends Component {
  state = {
    showLogin: true,
  };
  render() {
    return (
      <div className="authPage">
        <Button
          variant="contained"
          color="primary"
          className="authBTN"
          onClick={() => this.setState({ showLogin: !this.state.showLogin })}
        >
          {this.state.showLogin ? "Sign Up" : "Log In"}
        </Button>

        {this.state.showLogin ? (
          <Login setUserInState={this.props.setUserInState} />
        ) : (
          <Signup setUserInState={this.props.setUserInState} />
        )}
      </div>
    );
  }
}
