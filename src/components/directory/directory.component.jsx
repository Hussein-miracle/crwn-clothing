import React from "react";
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect"
// import directoryReducer from "../../redux/directory/directory.reducer";

import {selectDirectorySections} from "../../redux/directory/directory.selectors";

// import {}
import MenuItem  from "../menu-item/menu-item.component";


import "./directory.styles.scss";

const  Directory = ({sections})  => {

    return (
        <div className="directory-menu">           
            {
                sections.map( ({id, ...otherProps}) => {
                    return <MenuItem  key={id}  {...otherProps}/>
                })
            }
        </div>
        
    )

}

const mapStateToProps = createStructuredSelector({
    sections:selectDirectorySections
})

export default connect(mapStateToProps)(Directory);