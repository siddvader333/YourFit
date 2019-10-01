import React from 'react';
import './App.css';
import LoginContainer from './container/LoginContainer';
import RegistrationContainer from './container/RegistrationContainer';
import ForgotPasswordContainer from "./container/ForgotPasswordContainer";
import UserDashboardContainer from "./container/UserDashboardContainer";
import { Switch, Route} from 'react-router';
import DiagnosticContainer from './container/DiagnosticContainer';

const App: React.FC = () => {
	document.cookie = "isLoggedIn=false";
	return (
		<Switch>
			<Route path="/register" component={RegistrationContainer}/>
			<Route path="/forgot_password" component={ForgotPasswordContainer}/>
			<Route path="/logged_in" component={UserDashboardContainer} />
			<Route path="/diagnostic_test" component={DiagnosticContainer}/>
			<Route component={LoginContainer}/>
		</Switch>
	);
};
export default App;
