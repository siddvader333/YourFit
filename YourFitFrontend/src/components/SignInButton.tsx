import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/SignInButton.css";
const SignInButton = (props: any) => {
    const { onClick, type, displayText } = props;
    return (
      <button type={type} onClick={onClick} className="sign-in-button">{displayText}</button>
    );
};


SignInButton.propTypes ={
    onClick: PropTypes.func,
    type: PropTypes.string,
    displayText: PropTypes.string.isRequired
}
export default SignInButton;
