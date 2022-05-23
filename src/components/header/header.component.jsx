import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {createStructuredSelector} from "reselect";

import { ReactComponent as HeaderLogo } from "../../assets/crown.svg";

import "./header.styles.scss";
import {HeaderContainer,OptionBtn,OptionLink,OptionsContainer,OptionLinksContainer} from "./header.styles"
import { auth } from "../../firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon.component";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {selectCartHidden } from "../../redux/cart/cart.selectors";

import {selectCurrentUser} from "../../redux/user/user.selectors";

const Header = ({currentUser , hidden}) => {
    // console.log(currentUser)
    return (
        <HeaderContainer>
            <Link  to="/">

                <HeaderLogo className="logo" />

            </Link>

            <OptionsContainer>
                <OptionLink  to="shop">
                    SHOP
                </OptionLink>

                {
                    
                    currentUser ? <OptionBtn  onClick={() =>  auth.signOut() }> SIGN OUT</OptionBtn> :  <OptionLinksContainer> <OptionLink  to="/signin"> SIGN IN</OptionLink> <OptionLink  to="/signup"> SIGN UP</OptionLink></OptionLinksContainer>
                }
                
                <CartIcon/>

            </OptionsContainer>

            {
                hidden ? null : <CartDropdown/>
            }

            
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector (
    {
        currentUser: selectCurrentUser,
        hidden: selectCartHidden
    }
)

export default connect(mapStateToProps)(Header); 