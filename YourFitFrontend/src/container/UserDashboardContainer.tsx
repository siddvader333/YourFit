import React, { Component } from 'react';
import '../index.css';
import history from '../history';
import SignInButton from '../components/SignInButton';

/*
 * UserDashboardContainerState maintains the state of the login page
 * It maintains the following: 
 * inputValidity - boolean (once submitted) | default:true (on intial render)
 * username - string (holds user typed userName)
 * email - string (holds user typed string)
 * password - string (holds user typed password)
 * confirm_password - string (holds user typed password confirmation)
 * 
 */
type UserDashboardContainerState = {
    user: string,
    fetched: boolean,
    isAuthenticated: Promise<boolean>,
};

export default class UserDashboardContainer extends Component<{}, UserDashboardContainerState> {
     constructor(props: any){
        super(props);
        this.state = {
            user: '',
            fetched: false,
            isAuthenticated: this.IsAuth()
        }

        this.LogoutHandler = this.LogoutHandler.bind(this);
        this.UserHandler = this.UserHandler.bind(this);
    }

    async IsAuth(): Promise<boolean>{
        const loggedIn = await fetch('/auth');
        const json = await loggedIn.json();
        if(json.loggedIn){
            return true;
        }else {
            return false;
        }
    }

    async LogoutHandler(): Promise<void>{
        const isAuth = this.IsAuth()
        if(isAuth){
            const current_user = await fetch('/users/logout');
            if(current_user.status === 200){
                this.setState({user: ''});
            }
        }
        history.push('/login');
    }
    async UserHandler(): Promise<void>{
        const isAuth = await this.IsAuth();
        if(isAuth){
            const current_user = await fetch('/users/current');
			const userJson = await current_user.json();
            this.setState({user: userJson.email});
        }
    }
    render(): JSX.Element{
        if (document.cookie.split(';').filter((item) => item.includes('isLoggedIn=false')).length) {
            history.push('/login');
            return <></>;
        }
        return(
        <div>
            {this.state.user}
            <div>
				<SignInButton onClick={this.LogoutHandler} displayText="Logout"/>
                    <SignInButton onClick={this.UserHandler} displayText="Get current user" />
                    <img className="some-image"src="https://d22g7rdlsqssaf.cloudfront.net/737151.png"/>
            </div>
        </div>);

    }
};