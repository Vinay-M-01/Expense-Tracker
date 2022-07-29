import { createGlobalStyle } from "styled-components";


export const lightTheme ={
    body: "#fff",
    fontColor: "#000",
    div: "1px solid black"
};

export const darkTheme ={
    body:'#000',
    fontColor: "#fff",
    div: "1px solid white"
};

export const GlobalStyles = createGlobalStyle`

body{
    background-color: ${(props) => props.theme.body}
}

`;