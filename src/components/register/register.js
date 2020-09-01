import React from "react";
import styles from "./register.module.css";
import "./register.module.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: ""
    }
  }
  onNameChange = (event) => {
    this.setState({registerName: event.target.value})
  }
  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value})
  }
  onRegisterSubmit = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {"CONTENT-TYPE": "application/json"},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    }).then(response => response.json())
      .then(user => {
        if (user) { 
          this.props.loadUser(user)
          this.props.onRouteChange("home")
        }
      })
  }

  render() {
    const { onNameChange, onEmailChange, onPasswordChange, onRegisterSubmit } = this

    return (
      <main className={styles.registerMain}>
        <div className={styles.registrationForm}>
          <legend className={styles.registerLegend}>Register</legend>
          <div className={styles.registerElementContainer}>
            <label
              className={styles.registerLabel}
              id={styles.registerNameLabel}
              htmlFor={styles.registerName}
            >
              Name
            </label>
            <input
              className={styles.registerInput}
              id={styles.registerName}
              type="text"
              placeholder="Enter your name"
              onChange={onNameChange}
            />
          </div>
          <div className={styles.registerElementContainer}>
            <label
              className={styles.registerLabel}
              id={styles.registerEmailLabel}
              htmlFor={styles.emailAddress}
            >
              Email
            </label>
            <input
              className={styles.registerInput}
              id={styles.emailAddress}
              type="email"
              placeholder="Enter your email address"
              onChange={onEmailChange}
            />
          </div>
          <div className={styles.registerElementContainer}>
            <label
              className={styles.registerLabel}
              id={styles.registerPasswordLabel}
              htmlFor={styles.password}
            >
              Password
            </label>
            <input 
              className={styles.registerInput} 
              id={styles.password} 
              placeholder="Enter your password"
              onChange={onPasswordChange}
            />
          </div>
          
          <div className={styles.registerElementContainer}>
              <input 
                  className={styles.registerButton} 
                  id={styles.registerButton}
                  type="submit"
                  value="Register"
                  onClick={onRegisterSubmit}
                  />
          </div>
        </div>
      </main>
    );
  }
};

export default Register;
