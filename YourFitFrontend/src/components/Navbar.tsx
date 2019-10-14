import React from 'react';
import PropTypes from 'prop-types';
import '../css/components/Navbar.css';
import LogoutButton from './LogoutButton';
import history from '../history';
import HamburgerButton from './HamburgerButton';
const Navbar = (props: any) => {
	const { displayText, simplified, menuToggle } = props;
		return (
			<div className="navbar">
				{!simplified ? <HamburgerButton onClick={menuToggle}/> : null}
				<h1 className="navbar-title">{displayText}</h1>
				{!simplified ? <>
				<div className = "navbar-link-div ">
					<p className="navbar-link">Weekly</p>
				</div>
				<div className = "navbar-link-div">
					<p className="navbar-link">Random</p>
				</div>
				<div className = "navbar-link-div">
					<p className="navbar-link">Saved</p>
				</div>
				<div className = "navbar-link-div">
					<p className="navbar-link">Profile</p>
				</div></>
				:null}

				<LogoutButton
					onClick={async () => {
						await fetch('/users/logout', {
							method: 'POST',
							body: '',
							headers: { 'Content-Type': 'application/json' }
						});
						document.cookie = 'isLoggedIn=false';
						history.push('/login');
					}}
					displayText="Logout"
				/>
			</div>
		);
};

Navbar.propTypes = {
	displayText: PropTypes.string.isRequired,
	simplified: PropTypes.bool,
	menuToggle: PropTypes.func,
};
export default Navbar;
