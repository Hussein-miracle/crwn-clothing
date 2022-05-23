import React,{useEffect,useState,useCallback} from "react";
import SHOP_DATA from "../shop/shop.data";
import Spinner from "../../components/spinner/Spinner";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem  from "../../components/collection-item/collection-item.component";
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
import "./hats-page.styles.scss";
import WithRouter from "../../HOC/withRouter/withRouter";


const HatsPage = (props) => {
    // const collection  = useSelector((state) => selectCollection("hats")(state))
    // console.log(props.location,'props with params');
        const {collection} = props;
    // console.log(collection,'collection props with params');

    const [loading,setLoading] = useState(true);
    const Max = 1200;
    const Min = 100;
    const randomNum = useCallback((max,min) => Math.floor(Math.random() * (max - min) + 1),[]);
    const delay = randomNum(Max,Min);
    useEffect(()=>{
        setTimeout(()=>{
            // console.log(delay,'delay');
            setLoading(false);
        },delay);
    },[]);
    const {title , items } = !!collection ? collection : SHOP_DATA.hats;
        // const {title , items } = collection;
        const hatsPage = <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
            {
                items.map( item => <CollectionItem key={item.id} item = {item}/>)
            }
        </div>
    </div> ;
        const data = loading ? <Spinner/> : hatsPage;
        return (
            <>{data}</>
        )
    
    
    
    
    
}

// const HatsPageWithSpinner = WithSpinner(HatsPage);


const mapStateToProps = (state) =>  {
    return ({
        collection: selectCollection("hats")(state)
    })
}

export default connect(mapStateToProps)(WithRouter(HatsPage));