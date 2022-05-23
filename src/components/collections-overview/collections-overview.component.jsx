import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { CollectionPreview } from "../preview-collection/collection-preview.component";

import { selectCollectionsPreview } from "../../redux/shop/shop.selectors.js";
import "./collections-overview.styles.scss";

const CollectionsOverview = ({collections}) => {
    return (
        <div className="collections-overview">
             {
                collections.map( ({id,...otherCollectionProps}) => {
                    return <CollectionPreview key={id} {...otherCollectionProps}/>
                })
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections:selectCollectionsPreview
})

export default  connect(mapStateToProps)(CollectionsOverview);