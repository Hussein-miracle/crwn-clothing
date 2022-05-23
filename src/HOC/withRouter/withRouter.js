import React from 'react';

import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  
const withRouter = function(WrappedComponent) {

        return (props) => {
            let location = useLocation();
            let navigate = useNavigate();
            let params = useParams();
            
            return (<WrappedComponent {...props} location={location} navigate ={navigate} params={params}/>  )    
        };
}

  export default withRouter;