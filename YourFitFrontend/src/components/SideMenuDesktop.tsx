import React from 'react';
import PropTypes from 'prop-types';
import "../css/components/SideMenuDesktop.css";
const SideMenu = (props: any) => {
    const { onScreen, closeMenu } = props;

    return (
        <div data-on-screen={onScreen} className="side-menu-container">
            <p onClick={closeMenu}className="side-menu-container-close">X</p>
             <div className="side-menu-title">
                <p className="side-menu-title-text">YourFit</p>
            </div>
            <div className="side-menu-item hvr-underline-from-center">
                <p className="side-menu-item-text">Weekly Selection</p>
            </div>
            <div className="side-menu-item hvr-underline-from-center">
                <p className="side-menu-item-text">Random Selection</p>
            </div>
            <div className="side-menu-item hvr-underline-from-center">
                <p className="side-menu-item-text">My Saved Pieces</p>
            </div>
            <div className="side-menu-item hvr-underline-from-center">
                <p className="side-menu-item-text">My Profile</p>
            </div>
      </div>
    );
};

SideMenu.propTypes = {
    onScreen: PropTypes.bool,
    closeMenu: PropTypes.func
}
export default SideMenu;
