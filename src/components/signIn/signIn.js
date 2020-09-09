import React from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }
  onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json())
      .then(data => {
        if (data === "success") {
          this.props.onRouteChange("home");
          fetch(`http://localhost:3000/profile/${1}`, {
            method: "get",
            headers: {"Content-Type": "application/json"}
          }).then(response => response.json())
          .then(data => this.props.loadUser(data))
        }
      })
  }
  render() {
    const { onRouteChange } = this.props;
    const { onEmailChange, onPasswordChange, onSubmitSignIn } =  this;
    return (
      <main className={styles.signInMain}>
        <div className={styles.signInForm}>
          <legend className={styles.signInLegend}>Sign In</legend>
          <div className={styles.signInElementContainer}>
            <label
              className={styles.signInLabel}
              id={styles.signInEmailLabel}
              htmlFor={styles.emailAddress}
            >
              Email
            </label>
            <input
              className={styles.signInInput}
              id={styles.emailAddress}
              type="email"
              placeholder="Enter your email address"
              onChange={onEmailChange}
            />
          </div>
          <div className={styles.signInElementContainer}>
            <label
              className={styles.signInLabel}
              id={styles.signInPasswordLabel}
              htmlFor={styles.password}
            >
              Password
            </label>
            <input 
              className={styles.signInInput} 
              id={styles.password} 
              placeholder="Enter your password"
              onChange = {onPasswordChange}
            />
          </div>
          
          <div className={styles.signInElementContainer}>
              <input
              type="button"
              value="Register"
              className={styles.registerButton} 
              id={styles.registerButton}
              tabIndex="-2"
              onClick={() => onRouteChange("register")}
              />

              <input 
                  className={styles.signInButton} 
                  id={styles.signInButton}
                  type="submit"
                  value="Sign in"
                  tabIndex="-1"
                  onClick={onSubmitSignIn}
                  />

          </div>
        </div>
      </main>
    );
  }
};

export default SignIn;
