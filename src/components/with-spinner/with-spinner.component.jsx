import React from "react";
import Spinner from "../spinner/Spinner";


const WithSpinner = WrappedComponent =>  {


    const spinnerContainer =  ({isLoading,...otherProps}) => {
    return ( isLoading ? (<Spinner/>): <WrappedComponent {...otherProps}/> );

    }
    // const spinnerContainer =  ({isLoading,...otherProps}) => {
    // return ( isLoading ? (<SpinnerOverlay><SpinnerContainer/></SpinnerOverlay>): <WrappedComponent {...otherProps}/> )

    // }

    return spinnerContainer;
}


export default WithSpinner;