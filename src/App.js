import React from "react";

import {Routes,Route , Navigate } from "react-router-dom";

import { connect } from "react-redux" ;
import { createStructuredSelector } from "reselect";


import './App.css';



import HomePage from "./pages/homepage/homepage.component.jsx";

import Header from "./components/header/header.component.jsx";

import ShopPage from "./pages/shop/shop.component.jsx";
// import CollectionPage from "./pages/collection-page/collection-page";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import HatsPage from "./pages/hats-page/hats-page.component";
import SneakersPage from "./pages/sneakers-page/sneakers-page.component";
import MensPage from "./pages/mens-page/mens-page.component";
import JacketsPage from "./pages/jackets-page/jackets-page.component";
import WomensPage from "./pages/womens-page/womens-page.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth , createUserProfileDocument } from "./firebase/firebase.utils"
import { onSnapshot } from "firebase/firestore";

import {setCurrentUser } from "./redux/user/user.actions";

import {selectCurrentUser} from "./redux/user/user.selectors"

import Spinner from "./components/spinner/Spinner";
// import {selectCollectionsPreview  } from "./redux/shop/shop.selectors";

// const MensPageWithSpinner = WithSpinner(MensPage);
// const SneakersPageWithSpinner = WithSpinner(SneakersPage);
// const JacketsPageWithSpinner = WithSpinner(JacketsPage);
// const WomensPageWithSpinner = WithSpinner(WomensPage);

class App  extends React.Component{
  
  state = {
    loading:true
  }
  unsubscribeFromAuth = null;

  componentDidMount(){

    setTimeout(()=>{
      this.setState((state, props) => ({
        loading: false,
      }));
    },1500)
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth =  auth.onAuthStateChanged( async ( userAuth )=> {
      
      if(userAuth){

        const userRef = await createUserProfileDocument(userAuth);



        onSnapshot( userRef , (snapShot) => {

          setCurrentUser({
            id : snapShot.id,
            ...snapShot.data()
          })

        })

      }

      setCurrentUser(userAuth)

      // const dataArray = collectionsArray.map( ({title, items }) => ({title,items }) );
      // addCollectionsAndDocuments( "collection",dataArray);

      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
    
  }

  render(){

    

    return (
      <div className="App">
        <Header/>
        
        <Routes>

          <Route   path ="/"   element = { this.state.loading ? <Spinner/> : <HomePage/>} />
          <Route   path ="/shop"   element = {<ShopPage/>} />
          
          <Route path= "shop/hats" element = {<HatsPage/>} />
          <Route path= "shop/sneakers" element = {<SneakersPage/>} />
          <Route path= "shop/mens" element = {<MensPage/>} />
          <Route path= "shop/jackets" element = {<JacketsPage/>} />
          <Route path= "shop/womens" element = {<WomensPage/>} />
          
          

                
          <Route   path ="signin"  element = { this.props.currentUser ? (<Navigate to ="/" />)  : (<SignIn/>) }/>        
          <Route   path ="signup"   element = { this.props.currentUser ? (<Navigate to ="/" />)  : (<SignUp/>)} /> 

          <Route path="checkout" element={<CheckoutPage/>}/>
        </Routes>
        
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector ({
  currentUser:selectCurrentUser
}) ;
// const mapStateToProps = createStructuredSelector ({
//   currentUser:selectCurrentUser,
//   collectionsArray:selectCollectionsPreview
// }) ;


const mapDispatchToProps = ( dispatch ) => ({
  
  setCurrentUser:(user) => dispatch( setCurrentUser(user) )
})

export default connect( mapStateToProps , mapDispatchToProps)(App);
