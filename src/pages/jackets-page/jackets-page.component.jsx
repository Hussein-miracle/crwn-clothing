import React from "react";


import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem  from "../../components/collection-item/collection-item.component";
import "./jackets-page.styles.scss";




const JacketsPage = ( { collection  }) => {

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



const mapStateToProps = (state) =>  {
    return ({
        collection: selectCollection("jackets")(state)
    })
}
export default connect(mapStateToProps)(JacketsPage);