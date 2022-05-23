import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {createStructuredSelector} from "reselect";

import { ReactComponent as HeaderLogo } from "../../assets/crown.svg";

import "./header.styles.scss";
import {HeaderContainer,OptionBtn,OptionLinksContainer} from "./header.styles"
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

            <div className="options" >
                <Link className="option" to="shop">
                    SHOP
                </Link>

                {
                    
                    currentUser ? <OptionBtn  onClick={() =>  auth.signOut() }> SIGN OUT</OptionBtn> :  <OptionLinksContainer> <Link className="option"  to="/signin"> SIGN IN</Link> <Link className="option"  to="/signup"> SIGN UP</Link></OptionLinksContainer>
                }
                
                <CartIcon/>

            </div>

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