import React, { Component } from 'react';
import '../index.css';
import SignInInput from '../components/SignInInput';
import SignInButton from "../components/SignInButton";
import history from '../history';

/*
 * RegistrationContainerState maintains the state of the login page
 * It maintains the following: 
 * inputValidity - boolean (once submitted) | default:true (on intial render)
 * username - string (holds user typed userName)
 * email - string (holds user typed string)
 * password - string (holds user typed password)
 * confirm_password - string (holds user typed password confirmation)
 * 
 */
type RegistrationContainerState = {
	message: string;
	inputValidity: boolean | undefined;
	name: string;
    email: string;
    password: string;
    confirm_password: string;

};

export default class RegistrationContainer extends Component<{}, RegistrationContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			message: '',
			inputValidity: true,
			name: '',
            email:'',
            password: '',
            confirm_password: ''
		};
		this.RegisterSubmitHandler = this.RegisterSubmitHandler.bind(this);
		this.OnChangeHandler = this.OnChangeHandler.bind(this);
	}
	async RegisterSubmitHandler(): Promise<void> {
		const response = await fetch('/users/register', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: { 'Content-Type': 'application/json' }
		});

		const responseJSON = await response.json();

		this.setState({
			message: responseJSON.errorMessage,
			inputValidity: responseJSON.registerStatus
		});
		if(this.state.inputValidity){
    		setTimeout(() => {
      			history.push('/login');
    		}, 3000);
		}
	}
	OnChangeHandler(e: any): void {
		const attribute = e.target.placeholder.toLowerCase();
		if (attribute === "name"){
			this.setState({
				name: e.target.value
			}); 
		}else if (attribute === "password"){
			this.setState({
				password: e.target.value
			});
		}else if (attribute === "confirm password"){
			this.setState({
				confirm_password: e.target.value
			});
        } else {
            this.setState({email: e.target.value});
        }
    }

	render(): JSX.Element {
		const style = (this.state.inputValidity === false) ?
			{
				borderBottom: '0.1vh solid red'
			}: null;
		const displayMessage = (this.state.inputValidity) ? `${this.state.message}` : `Sorry an error occured. ${this.state.message}`;
		return (
			<div className="register-container"> 
				<div className="register-title">Register</div>
				<div className="login-error-text">
					{displayMessage}
				</div>
				<SignInInput style={style} onChange ={this.OnChangeHandler} type="text" placeholder="Name"/>
                <SignInInput style={style} onChange ={this.OnChangeHandler} type="text" placeholder="Email"/>
				<SignInInput style={style} onChange ={this.OnChangeHandler} type="password" placeholder="Password"/>
                <SignInInput style={style} onChange ={this.OnChangeHandler} type="password" placeholder="Confirm Password"/>
				<SignInButton onClick={this.RegisterSubmitHandler} displayText="Sign-up"/>
				<div className="login-small-text">Have an account? <a href="/login" className="link primary">Login.</a></div>
			</div>
		);
	}
}
