import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/LogoutButton.css";
const LogoutButton = (props: any) => {
    const { onClick, type, displayText} = props;
    return (
      <button type={type} onClick={onClick} className="log-out-button">{displayText}</button>
    );
};

LogoutButton.propTypes ={
    onClick: PropTypes.func,
    type: PropTypes.string,
   displayText: PropTypes.string.isRequired,
}
export default LogoutButton;
