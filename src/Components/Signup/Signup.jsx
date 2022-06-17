import { Component } from "react";
import { TextField, Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./Signup.css";

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirm.value) {
      throw new Error("Error passwords are not correct!"); //how to display message to user
    }
    try {
      const userResponse = await fetch("/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });

      if (!userResponse.ok)
        throw new Error("Auth Failed - Please try again later");

      let token = await userResponse.json();
      localStorage.setItem("token", token);

      const userInfo = JSON.parse(atob(token.split(".")[1])).user;
      this.props.setUserInState(userInfo);
    } catch (err) {}
  };

  render() {
    return (
      <Grid Container spacing={3}>
        <Grid item xs={4}>
          <div>
            <Typography variant="h2"> Sign Up </Typography>

            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                className="text"
                variant="outlined"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                label="Name"
                required
              ></TextField>
              <TextField
                variant="outlined"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                label="Email"
                required
              ></TextField>
              <TextField
                variant="outlined"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                label="Password"
                required
              ></TextField>
              <TextField
                variant="outlined"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                type="password"
                label="Confirm"
                required
              ></TextField>
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}
