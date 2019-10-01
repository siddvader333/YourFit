import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/DiagnosticContinueButton.css";
const DiagnosticContinueButton = (props: any) => {
    const { onClick, isDisabled } = props;
    console.log('DISABLED: '+ isDisabled);
    return (
        <button onClick={() => { onClick(isDisabled)}} data-disabled={isDisabled}className="diagnostic-continue-button">—></button>
    );
};

DiagnosticContinueButton.propTypes ={
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    displayText: PropTypes.string
}
export default DiagnosticContinueButton;
