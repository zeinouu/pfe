import React, { Component } from 'react'
import './signup.css'
export default class SignUp extends Component {

constructor(props){
  super(props);
  this.state = {
    fname:"",
    lname:"",
    email:"",
    password:"",
    fnameError: "",
    lnameError: "",
    emailError: "",
    passwordError: "",
  };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleValidation = this.handleValidation.bind(this);

}

handleSubmit(e){
  e.preventDefault();
 
  if(this.handleValidation()) {
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch("http://localhost:8801/api/auth/signup", {
      method: "POST",
      crossDomain: true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data, "UserCreated");
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
handleValidation() {
  let fnameError = "";
  let lnameError = "";
  let emailError = "";
  let passwordError = "";

  if (!this.state.fname) {
    fnameError = "First name is required.";
  } else if (!/^[a-zA-Z]+$/.test(this.state.fname)) {
    fnameError = "First name should contain only alphabets.";
  }

  if (!this.state.lname) {
    lnameError = "Last name is required.";
  } else if (!/^[a-zA-Z]+$/.test(this.state.lname)) {
    lnameError = "Last name should contain only alphabets.";
  }

  if (!this.state.email) {
    emailError = "Email address is required.";
  } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
    emailError = "Invalid email address.";
  }

  if (!this.state.password) {
    passwordError = "Password is required.";
  }else if ((this.state.password.length) < 4) {
    passwordError = "Password must be more than 4 characters.";
  }else if ((this.state.password.length) > 10) {
    passwordError = "Password cannot exceed more than 10 characters.";
  }

  this.setState({
    fnameError,
    lnameError,
    emailError,
    passwordError
  });

  return !(fnameError || lnameError || emailError || passwordError);
}


  render() {
    return (
      <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
      <form  onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"

            required
            onChange={(e) => this.setState({ 
            fname: e.target.value })
            }
          />
           {this.state.fnameError && <div className="invalid-feedback">{this.state.fnameError}</div>}
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text"
          className="form-control" 
          placeholder="Last name" 
          required
          onChange={(e) => this.setState({ 
          lname: e.target.value })
           }/>
             {this.state.lnameError && <div className="invalid-feedback">{this.state.lnameError}</div>}
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) => this.setState({ 
            email: e.target.value })
           }
          />
            {this.state.emailError && <div className="invalid-feedback">{this.state.emailError}</div>}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={(e) => this.setState({ 
            password: e.target.value })
            }
          />
            {this.state.passwordError && <div className="invalid-feedback">{this.state.passwordError}</div>}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
      </div>
      </div>
      </div>
    )
  }
}