import React,{Component} from "react";
import {Routes , Route} from "react-router-dom";
import { connect } from "react-redux";
// import { collection ,onSnapshot } from "@firebase/firestore";
// import { firestoreDatabase , convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import CollectionPage from "./../collection-page/collection-page";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
// import 
import WithRouter from "../../HOC/withRouter/withRouter";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

// import {updateCollections} from "../../redux/shop/shop.actions";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends Component{

    
    
    

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
        console.log(this.props,'shop comp props');


    }

    render(){
        const {isCollectionFetching} = this.props;
        return (
            <div className="shop-page">
                
                <Routes>
                    <Route exact path= "/" element ={<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />} />
                    <Route   path ="/shop/:item"   element = {<CollectionPage/>} />
                </Routes>
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => {
    return {
        fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(WithRouter(ShopPage));