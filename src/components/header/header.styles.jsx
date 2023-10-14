import styled,{css} from "styled-components";
import { Link } from "react-router-dom";

const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;
`

export const OptionLinksContainer = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
`;


export const HeaderLogo = styled.h3`


`;


export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;


    
`

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 100%;
    padding: 20px;
    flex:.4;
    @media(max-width:320px){
        flex:.3;
        padding: 15px;
    }
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

`
export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`
export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`

export const OptionBtn = styled.button`
    border:none;
    background-color:transparent;
    ${OptionContainerStyles}
`
