import {createSelector } from "reselect";

// import shopReducer from "./shop.reducer";



const selectShop = ( state ) => state.shop;

export const  selectCollections = createSelector(
    [selectShop],
    (shop) =>  shop.collections

)
export const  selectCollectionsPreview = createSelector(
    [selectCollections],
    (collections) => collections ? Object.keys(collections).map( collection => collections[collection] ) : []

)



export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    (collections) => collections ?  collections[collectionUrlParam] : null
)
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching 
)



// const selectCollection = collectionUrlParam => createSelector(
//     [selectShopCollections],
//     (shopData) =>  shopData[COLLECTION_ID_MAP[collectionUrlParam]]
// )

// const 