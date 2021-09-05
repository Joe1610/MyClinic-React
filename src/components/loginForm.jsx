import React from "react";
import Form from "../common/form";
import Input from "../common/input";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doAction = () => {
    console.log("Submitted...");
  };
  render() {
    const { data: account, errors } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            onChange={this.handleChange}
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <Input
            value={account.password}
            onChange={this.handleChange}
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
