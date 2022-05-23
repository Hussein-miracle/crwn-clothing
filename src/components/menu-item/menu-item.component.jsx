import React from "react";

import {Link} from "react-router-dom";
import "./menu-item.styles.scss";



const MenuItem = ({title,imageUrl,size,linkUrl}) => {
    
    return (
        <div   className={`${size} menu-item`}>

            <div style = {{
            backgroundImage: `url(${imageUrl})`} } className="background-image">

            </div>
            
            <Link to={`${linkUrl}`}>
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">Check Out</span>
                </div>
            </Link>
            
        </div>
    )
}


export default MenuItem;