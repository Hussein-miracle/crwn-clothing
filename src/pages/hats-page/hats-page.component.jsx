import React from "react";


import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem  from "../../components/collection-item/collection-item.component";
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
import "./hats-page.styles.scss";



const HatsPage = ( { collection  }) => {

        const {title , items } = collection;
        return (
            <div className="collection-page">
                <h2 className="title">{title}</h2>
                <div className="items">
                    {
                        items.map( item => <CollectionItem key={item.id} item = {item}/>)
                    }
                </div>
            </div> 
        ) 
    
    
    
    
}

// const HatsPageWithSpinner = WithSpinner(HatsPage);


const mapStateToProps = (state) =>  {
    return ({
        collection: selectCollection("hats")(state)
    })
}
export default connect(mapStateToProps)(HatsPage);