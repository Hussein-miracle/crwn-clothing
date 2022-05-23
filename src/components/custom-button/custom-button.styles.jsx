import styled,{css} from "styled-components";

const buttonStyles = css`
    border:none;
    background-color: black;
    color: white;

`
const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 2px solid black;

    &:hover{
        background-color: black;
        color: white;
        
    }
`

const googleSignInStyles =css`
    background-color: #4285f4;
    color: #fff;

    &:hover{
        border: 0;
        background-color: #7e85f4;
    }
`


const getButtonStyles = props => {
    if(props.isGoogleSignIn){
        return googleSignInStyles;
    }

    return props.inverted ? invertedButtonStyles : buttonStyles;
}

export const CustomButtonContainer = styled.button`
    min-width: 60px;
    width: max-content;
    height: 50px;
    letter-spacing: 0.4px;

    line-height: 45px;

    padding: 0 30px 0 30px;
    font-size: 15px;
   
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    
    cursor: pointer;

    display: flex;
    justify-content: center;

    &:hover {
    background-color: white;
    color: black;
    border: 2px solid black;
    }

    ${getButtonStyles}

`