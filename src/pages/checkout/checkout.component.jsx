import React, { useEffect } from "react";

import { connect } from "react-redux";
// import { ReactComponent  as PaystackLogo } from "../../assets/paystackSvg.svg";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ cartItems, total, currentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <div className="total">
        <span>TOTAL: #{total * 250}</span>
        {total ? (
          <button>
            <a
              className="payment-link"
              href={`${"https://paystack.com/pay/hip-fitz"}`}
              rel="noreferrer"
              target="_blank"
            >
              <div className="payment-link__img"></div>

              <span className="payment-link__text">Pay</span>
            </a>
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CheckoutPage);
