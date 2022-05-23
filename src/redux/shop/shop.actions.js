import ShopActionTypes from "./shop.types";
import { onSnapshot , collection } from "@firebase/firestore";
// import { collection } from "@firebase/firestore";
import { convertCollectionsSnapshotToMap ,firestoreDatabase} from "../../firebase/firebase.utils";

// export const updateCollections = (collectionsMap) => ({
//     type:ShopActionTypes.UPDATE_COLLECTIONS,
//     payload:collectionsMap
// })

export  const fetchCollectionsSuccess = (payload) => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload,
})


export  const fetchCollectionsStart = () => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_START,
})



export  const fetchCollectionsFailure = () => ({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:""
})




export  const fetchCollectionsStartAsync = () => {

    return dispatch => {

        const collectionRef = collection(firestoreDatabase,"collection");

        dispatch( fetchCollectionsStart() )

        try{
            onSnapshot( collectionRef , async(snapShot) => {
            const collectionsMap =  convertCollectionsSnapshotToMap(snapShot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
            
            }
            )
        }catch(err){ 
            console.error(err)
            dispatch(fetchCollectionsFailure(err.message))
        }
    }
}