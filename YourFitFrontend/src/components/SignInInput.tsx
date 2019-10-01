import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/SignInInput.css";
const SignInInput = (props: any) => {
    const { style, onChange, placeholder, name, type } = props;
    return (
      <input name={name} style={style} onChange={onChange} className ="sign-in-input" type={type} placeholder={placeholder}/>
    );
};


SignInInput.propTypes = {
    style: PropTypes.object,
    onChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired

}
export default SignInInput;
