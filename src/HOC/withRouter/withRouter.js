import React from 'react';
import {useParams,useLocation,useNavigate} from  "react-router-dom";

const withRouter = (WrappedComponent) => {
    const params = useParams();
    const location = useLocation();
    const navigate= useNavigate();

    return (props) => {
        return <WrappedComponent {...props} 
        location={location} 
        navigate={navigate}
        params={params}/>;
    }
}

export default withRouter;