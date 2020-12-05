import React from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		};
	}
	componentDidMount() {
		document.addEventListener("keydown", this.onKeyDown.bind(this));
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.onKeyDown.bind(this));
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};
	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};
	onSubmitSignIn = () => {
		fetch("https://cryptic-journey-42100.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.onRouteChange("home");
					this.props.loadUser(user);
				}
			});
	};
	onKeyDown(event) {
		if (
			event.key === "Enter" &&
			this.state.signInEmail &&
			this.state.signInPassword
		) {
			this.onSubmitSignIn();
		}
	}
	render() {
		const { onRouteChange } = this.props;
		const { onEmailChange, onPasswordChange, onSubmitSignIn } = this;
		return (
			<main className={styles.signInMain}>
				<div className={styles.signInForm}>
					<legend className={styles.signInLegend}>Sign In</legend>
					<div className={styles.signInElementContainer}>
						<label
							className={styles.signInLabel}
							id={styles.signInEmailLabel}
							htmlFor="email-address"
						>
							Email
						</label>
						<input
							className={styles.signInInput}
							id="email-address"
							name="email-address"
							type="email"
							placeholder="Enter your email address"
							onChange={onEmailChange}
						/>
					</div>
					<div className={styles.signInElementContainer}>
						<label
							className={styles.signInLabel}
							id={styles.signInPasswordLabel}
							htmlFor="password"
						>
							Password
						</label>
						<input
							className={styles.signInInput}
							id="password"
							type="password"
							name="password"
							placeholder="Enter your password"
							onChange={onPasswordChange}
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
}

export default SignIn;
