import React,{useEffect} from 'react';
import { connect , useDispatch, useSelector} from "react-redux";
import WithRouter from '../../HOC/withRouter/withRouter';
import { selectCollection } from "../../redux/shop/shop.selectors";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import Spinner from '../../components/spinner/Spinner';
import CollectionItem  from "../../components/collection-item/collection-item.component";
// let  item;
const CollectionPage = ({collection}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.shop.isFetching);
  useEffect(()=>{

    // console.log(isFetching,'isFetching')
    dispatch(fetchCollectionsStartAsync());
    // console.log(isFetching,'isFetching');

  },[]);

  const {title , items} = collection;
  const collectionFetched = <div className="collection-page">
    <h2 className="title">{title}</h2>
    <div className="items">
        {
            items.map( item => <CollectionItem key={item.id} item = {item}/>)
        }
  </div>
  </div>;
  const data = loading ? <Spinner/> : collectionFetched;
  return (
    
    <>{data}</>
      
    
  );
}

const mapStateToProps = (state) =>  { 
  // console.log(state,item);

  return ({
      collection: selectCollection('')(state)
  })
}

export default connect(mapStateToProps)(WithRouter(CollectionPage));