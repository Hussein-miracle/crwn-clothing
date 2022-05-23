import React from "react";

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component"

import { auth , signInWithGoogle } from "../../firebase/firebase.utils";

import { createUserWithEmailAndPassword } from "firebase/auth";

import "./sign-in.styles.scss";


class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email : "",
            password:""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email , password } =  this.state ;


        try{
            
            await createUserWithEmailAndPassword(auth , email , password);

            this.setState({email:"" , password: ""})

        }catch(err){
            alert(err)
            alert(err.message)
            (err)
            (err.message)
        }


        
    }

    handleChange = (event) =>{
        // (event.target);
        const {name , value} = event.target;
        // (name);
        this.setState( { [name] : value } )
        
        
    }

    render(){
        return (
            <div className="center">
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span className="title">Sign in with your email and password</span>

                <form  onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text" 
                        name="email" 
                        label="Email"
                        handleChange = {this.handleChange} 
                        value= {this.state.email} 
                        required 
                    />

                    


                    <FormInput 
                    type="password" 
                    name="password"  
                    label="Password"
                    value={this.state.password}
                    handleChange = { this.handleChange}
                    required />


                    
                    <div className="btns">
                        <CustomButton onClick={this.handleSubmit}  type="submit"> Sign in </CustomButton>

                        <CustomButton onClick={ signInWithGoogle }  type="submit" isGoogleSignIn = {true}> Google Sign In</CustomButton>
                    </div>
                    
                </form>
            </div>
           </div> 

            
        )
    }
}

export default SignIn;