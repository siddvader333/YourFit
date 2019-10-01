import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/DiagnosticOption.css";
const DiagnosticOption = (props: any) => {
    const { onClick, isSelected, displayText } = props;
        return (
            <div onClick={() => { onClick(displayText)}} className="diagnostic-option" data-selected={isSelected} >
                {displayText}
            </div >);
};

DiagnosticOption.propTypes ={
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    displayText: PropTypes.string.isRequired
}
export default DiagnosticOption;
