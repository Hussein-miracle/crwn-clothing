import React,{Component} from "react";
import {Link} from "react-router-dom";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import { auth ,createUserProfileDocument } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";



class SignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            
                displayName: "",
                email:"",
                password:"",
                passwordConfirm:""

            
        }
    }


    handleChange = (e) => {
        e.preventDefault();
        const {name , value} = e.target;


        this.setState({ [`${name}`]:value  })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const  {displayName ,email,password ,passwordConfirm } = this.state;

        if(password !== passwordConfirm && !password.includes(passwordConfirm)){
            alert("passwords don't match");

            return;
        }

        try{

            const { user } = await createUserWithEmailAndPassword( auth , email , password);



            await createUserProfileDocument(user , { displayName });

        }catch(err){
            alert(err);

        
        }

        this.setState({
            displayName: "",
            email:"",
            password:"",
            passwordConfirm:""
            
        })
    }


    render(){
        const  {displayName ,email, password ,passwordConfirm } = this.state;
        return (
            <div className="center">
                <div className="sign-up">
                    <h2 className="title">Shop with us</h2>
                    <span>Sign Up With Your Email And Password </span>
                    <form  className= "sign-up-form" onSubmit={this.handleSubmit}>
                        <FormInput
                        type="text"
                        value= {displayName} 
                        label="Username"
                        name="displayName"
                        handleChange={this.handleChange}
                        required
                        />

                        <FormInput
                        type="email"
                        label="Email"
                        name="email"
                        value= {email} 
                        handleChange={this.handleChange}
                        required
                        />

                        

                        <FormInput
                        type="password"
                        value= {password} 
                        label="Password"
                        name="password"
                        handleChange={this.handleChange}
                        required
                        />
                        
                        <FormInput
                        type="password"
                        value= {passwordConfirm} 
                        label="Confirm Password"
                        name="passwordConfirm"
                        handleChange={this.handleChange}

                        required
                        />

                        <CustomButton type="submit" onClick = {this.handleSubmit}  className="sign-up__btn">Submit</CustomButton>
                    </form>
                    
        
                    
        
                    <div className="sign-up__sing-in-access">
                        <h3>Already have an account? <Link className="sign-up__sign-in--link" to ="../signin"> Sign in</Link></h3>
                    </div>
        
        
                </div>
            </div>
            
        )
    }
}


export default SignUp;