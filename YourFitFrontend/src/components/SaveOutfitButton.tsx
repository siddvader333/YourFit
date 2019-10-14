import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/SaveOutfitButton.css";
const SaveOutfitButton = (props: any) => {
    const {onClick} = props;
    return (
      <button onClick={onClick} className="save-outfit-button">+</button>
    );
};


SaveOutfitButton.propTypes ={
    onClick: PropTypes.func,
}
export default SaveOutfitButton;
