import styled from "styled-components";

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;
    padding: 10px;

    @media(max-width:320px){
        padding:0;
        display:grid;
        grid-template-columns: repeat(auto-fit,1fr);
        grid-template-rows: repeat(3,1fr);
    }

`
