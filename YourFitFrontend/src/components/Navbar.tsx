import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/Navbar.css";
import LogoutButton from './LogoutButton';
import history from '../history';
const Navbar = (props: any) => {
    const { displayText } = props;
        return (
          <div className="navbar">
            <h1 className="navbar-title">{displayText}</h1>
                <LogoutButton onClick={async () => {await fetch('/users/logout', {
			method: 'POST',
			body: '',
			headers: { 'Content-Type': 'application/json' }
                });
                    document.cookie = "isLoggedIn=false";
                    history.push('/login');
                }} displayText="Logout" />
</div>);
};

Navbar.propTypes ={
    displayText: PropTypes.string.isRequired
}
export default Navbar;
