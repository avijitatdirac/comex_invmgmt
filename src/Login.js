import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import './css/index.css';
import './css/main.css';

import App from './App';

class Login extends Component {
	state = {
		redirectToReferrer: false,
		isLoggedIn: false,
	};

	// login = () => {
	// 	fakeAuth.authenticate(() => {
	// 		this.setState({ redirectToReferrer: true });
	// 	});
	// };

	// login = () => {
	// 	console.log('login function called');
	// 	this.setState({ isLoggedIn: true });
	// };

	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {
			isLoggedIn: false,
			userName: '',
			password: '',
		};
	}

	handleLoginClick() {


		let user = {username:'admin'}
		this.setState({
			isLoggedIn: true,
		});
		console.log(`username & password are ${this.state.userName} & ${this.state.password}`);
		var queryString =
			'/validateUser?data=' +
			JSON.stringify({
				username: this.state.userName,
				password: this.state.password,
			});
		console.log('queryString = ', queryString);
		fetch(queryString, { method: 'POST' })
			.then(r => r.json())
			.then(data => {
				console.log(data);
				if (data.isSuccess) {
					// say operation succeeded, no failure
					this.setState({ isLoggedIn: true });
				} else {
					// say operation failure no success
					this.setState({ isLoggedIn: false });
					// stop further insertions
					return;
				}
			})
			.catch(err => console.log(err));
	}

	handleLogoutClick() {
		this.setState({ isLoggedIn: false });
	}

	handlePasswordInput = event => this.setState({ password: event.target.value });
	handleUserNameInput = event => this.setState({ userName: event.target.value });

	render() {
		const { from } = { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;

		if (this.state.isLoggedIn) {
			return <App />;
		}
		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}
		return (
			<div className="login100-form validate-form">
				<div className="wrap-login100">
					<div className="limiter">
						<div className="container-login100">
							<div className="wrap-login100">
								<div
									className="login100-form-title"
									style={{
										backgroundImage:
											"url('https://st3.depositphotos.com/4278403/18160/v/600/depositphotos_181606830-stock-video-green-lock-icon-form-green.jpg')",
									}}
								>
									<span className="login100-form-title-1"> Sign In </span>
								</div>
							</div>
							<div className="foo">
								<div className="wrap-input100 validate-input m-b-26">
									<span className="label-input100">Username</span>
									<input
										type="text"
										className="input100 has-val"
										placeholder="Enter Username"
										onChange={this.handleUserNameInput}
									/>
									<span className="focus-input100" />
								</div>
								<div className="wrap-input100 validate-input m-b-18">
									<span className="label-input100">Password </span>
									<input
										type="password"
										className="input100"
										placeholder="Enter Password"
										onChange={this.handlePasswordInput}
									/>
									<span className="focus-input100" />
								</div>

								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.handleLoginClick}>
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
