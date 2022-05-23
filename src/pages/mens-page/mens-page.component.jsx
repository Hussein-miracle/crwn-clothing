import React,{useEffect,useState,useCallback} from "react";

import SHOP_DATA from "../shop/shop.data";

import { connect } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem  from "../../components/collection-item/collection-item.component";

import "./mens-page.styles.scss";



const MensPage = ( { collection  }) => {
    const [loading,setLoading] = useState(true);
    const Max = 1200;
    const Min = 100;
    const randomNum = useCallback((max,min) => Math.floor(Math.random() * (max - min) + 1),[]);
    const delay = randomNum(Max,Min);

    useEffect(()=>{
        setTimeout(()=>{
            console.log(delay,'delay');
            setLoading(false);
        },delay);
    },[])


    const {title , items } = !!collection ? collection : SHOP_DATA.mens;
    const mens = <div className="collection-page">
    <h2 className="title">{title}</h2>
    <div className="items">
        {
            items.map( item => <CollectionItem key={item.id} item = {item}/>)
        }

</div>    </div>;



        const data = loading ? <Spinner/> : mens;
        return (
            <>{data}</>
        )
}



const mapStateToProps = (state) =>  {
    return ({
        collection: selectCollection("mens")(state)
    })
}
export default connect(mapStateToProps)(MensPage);