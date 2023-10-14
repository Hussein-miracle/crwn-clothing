import React from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { withRouter } from  "react-router-dom"
import { selectCartItems } from "../../redux/cart/cart.selectors";

import { createStructuredSelector } from "reselect";

import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { CartItem } from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const CartDropdown = ({ cartItems, dispatch, currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className="cart-dropdown">
      <div className="cart-items allow-scrollbar">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message"> Your cart is empty </span>
        )}
      </div>

      <CustomButton
        onClick={() => {
          // console.log({currentUser})

          if (!!currentUser) {
            navigate("/checkout");
          } else {
            navigate("/signin?redirect=checkout");
          }

          dispatch(toggleCartHidden());
        }}
      >
        {currentUser ? "Go To Checkout" : "Sign In"}
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(CartDropdown);
