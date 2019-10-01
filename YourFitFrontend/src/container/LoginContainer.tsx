import React, { Component } from 'react';
import '../index.css';
import SignInInput from '../components/SignInInput';
import SignInButton from '../components/SignInButton';
import history from '../history';

/*
 * LoginContainerState maintains the state of the login page
 * It maintains the following: 
 * inputValidity - boolean (once submitted) | undefined (on intial render)
 * username - string (holds user typed userName)
 * password - string (holds user typed password)
 * 
 */

type LoginContainerState = {
	message: string;
	inputValidity: boolean | undefined;
	shouldRedirect: boolean;
	redirectTo: string;
	username: string;
	password: string;
};

export default class LoginContainer extends Component<{}, LoginContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			message: '',
			inputValidity: true,
			shouldRedirect: false,
			redirectTo: '',
			username: '',
			password: ''
		};
		this.LoginSubmitHandler = this.LoginSubmitHandler.bind(this);
		this.OnChangeHandler = this.OnChangeHandler.bind(this);
	}
	async LoginSubmitHandler(): Promise<void> {
		const response = await fetch('/users/login', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		});

		const responseJSON = await response.json();

		this.setState({
			message: responseJSON.errorMessage,
			inputValidity: responseJSON.loginStatus
		});

		if (this.state.inputValidity) {
			document.cookie = "isLoggedIn=true";
			const response = await fetch('/diagnostic/isCompleted');
			const responseJSON = await response.json();
			if (responseJSON) {
				history.push('/logged_in');
			} else { 
				history.push('/diagnostic_test');
			}
		}

	}
	async LogOutHandler(): Promise<void> {
		await fetch('/users/logout');
	}
	OnChangeHandler(e: any): void {
		if (e.target.placeholder.toLowerCase() === 'email') {
			this.setState({
				username: e.target.value
			});
		} else {
			this.setState({
				password: e.target.value
			});
		}
	}
	render(): JSX.Element {
		const style = (this.state.inputValidity === false) ?
			{
				borderBottom: '0.1vh solid red'
			}: null;
		const displayMessage = (this.state.inputValidity) ? `${this.state.message}` : `Sorry an error occured. ${this.state.message}`;
		if (document.cookie.split(';').filter((item) => item.includes('isLoggedIn=True')).length) {
            history.push('/logged_in');
            return <></>;
        }
		return (
			<div className="login-container"> 
				<div className="login-title">Login</div>
				<div className="login-error-text">
					{displayMessage}
				</div>
				<SignInInput style={style} onChange={this.OnChangeHandler} type="text" placeholder="Email" />
				<SignInInput style={style} onChange={this.OnChangeHandler} type="password" placeholder="Password" />
				<SignInButton onClick={this.LoginSubmitHandler} displayText="Sign-in" />
				<div className="login-small-text">
					Forgot your{' '}
					<span  onClick={() => { history.push('/forgot_password')}} className="primary link">
						password?
					</span>
				</div>
				<div className="login-small-text">
					Need to{' '}
					<span onClick={() => { history.push('/register')}} className="primary link">
						Register?
					</span>
				</div>
			</div>
		);
	}
}
