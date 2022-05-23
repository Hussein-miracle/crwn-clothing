import React from "react";
// import {Link} from "react-router-dom";
import "./homepage.styles.scss"
import { HomePageContainer } from "./homepage.styles"
import Directory from "../../components/directory/directory.component";



const HomePage = () => {
    return (

               
        <HomePageContainer>
            <Directory/>
        </HomePageContainer>
            
            
        
    )
}

export default HomePage;