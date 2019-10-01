import React, { Component } from 'react';
import '../index.css';
import SignInInput from '../components/SignInInput';
import SignInButton from "../components/SignInButton";
import history from '../history';

/*
 * ForgotPasswordContainerState maintains the state of the login page
 * It maintains the following: 
 * inputValidity - boolean (once submitted) | default:true (on intial render)
 * username - string (holds user typed userName)
 * email - string (holds user typed string)
 * password - string (holds user typed password)
 * confirm_password - string (holds user typed password confirmation)
 * 
 */
type ForgotPasswordContainerState = {
    inputValidity: boolean | undefined;
    emailSent: boolean;
    email: string;
};

export default class RegistrationContainer extends Component<{}, ForgotPasswordContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
            inputValidity: true,
            emailSent: false,
            email:''
		};
		this.RegisterSubmitHandler = this.RegisterSubmitHandler.bind(this);
		this.OnChangeHandler = this.OnChangeHandler.bind(this);
	}
	RegisterSubmitHandler(): void {
		if(/* add check to see if valid email*/this.state.email === "" ){
            this.setState({inputValidity: false});
            this.setState({emailSent: false});
        } else {
            this.setState({inputValidity: true});
            //send email here 
            this.setState({emailSent: true});
        }
	}
	OnChangeHandler(e: any): void {
        this.setState({email: e.target.value});
    }

	render(): JSX.Element {
        const style = this.state.inputValidity ? null : {
			borderBottom: "0.1vh solid red"
        };
        console.log(this.state.inputValidity);
		return (
			<div className="register-container"> 
				<div className="register-title">Forgot Password?</div>
                {this.state.inputValidity ? null: <div className="login-error-text">
                    Sorry, an error occured. Make sure you entered a valid email.
                </div>}
                {this.state.emailSent? <div className="login-error-text">
                    Thanks! We sent an email to change your password. 
                </div>: null}
                <SignInInput style={style} onChange ={this.OnChangeHandler} type="text" placeholder="Email"/>
				<SignInButton onClick={this.RegisterSubmitHandler} displayText="Confirm"/>
				<div className="login-small-text">Have an account? <span onClick={() => { history.push('/login')}} className="link primary">Login.</span></div>
                <div className="login-small-text">Need to <span className="primary link" onClick={() => { history.push('/register')}}>Register?</span></div>
			</div>
		);
	}
}
