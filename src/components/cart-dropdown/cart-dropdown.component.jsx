import React from "react";

import {connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import { withRouter } from  "react-router-dom"
import { selectCartItems } from "../../redux/cart/cart.selectors";

import { createStructuredSelector } from "reselect";

import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { CartItem } from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems , dispatch}) => {
    // console.log(dispatch);

    const navigate = useNavigate();
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {   cartItems.length > 0 ?  (
                    cartItems.map ( cartItem => (
                    <CartItem key={cartItem.id} item = {cartItem}/>
                    ) )) : 
                    (<span className="empty-message"> Your cart is empty </span>)
                    
                }
            </div>

            <CustomButton onClick= { () => {
        
                    navigate("/checkout");

                    dispatch(toggleCartHidden());

                	}
                }>Go To Checkout</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ( {
    cartItems : selectCartItems
})
export default connect(mapStateToProps)(CartDropdown);