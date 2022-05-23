import React from "react";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

import { ReactComponent as  ShoppingIcon} from "../../assets/shopping-bag.svg";
import { createStructuredSelector } from "reselect";


const CartIcon = ({toggleCartHidden , itemCount}) => {
    return (
        <div className="cart-icon"  onClick = { toggleCartHidden}>
            <ShoppingIcon className = "shopping-icon"/>
            
            <div className="item-count__container">
                <span className="item-count">{itemCount }</span>
            </div>
            
        </div>
    )
}

const mapDispatchToProps = ( dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})


const mapStateToProps = createStructuredSelector ({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);