import React from "react";
import Form from "../common/form";
import Input from "../common/input";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doAction = () => {
    console.log("Registered...");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={data.username}
            onChange={this.handleChange}
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <Input
            value={data.password}
            onChange={this.handleChange}
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          <Input
            value={data.name}
            onChange={this.handleChange}
            name="name"
            label="Name"
            type="text"
            error={errors.name}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Register
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
