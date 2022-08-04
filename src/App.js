import { Redirect, Route, Switch } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Expenses from "./components/Pages/Expenses";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Profile from "./components/Pages/Profile";
import Welcome from "./components/Pages/Welcome";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme, GlobalStyles}  from './theme'
// import { expenseActions } from "./store";
import { useSelector } from "react-redux";

const StyledApp = styled.div`
color: ${(props) => props.theme.fontColor};
border: ${(props) => props.theme.border}
`

function App() {
const premiumState = useSelector(state => state.expenses.premiumState)

  const [theme, setTheme]= useState("light")



  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <StyledApp>
    <div>
      {premiumState && <button onClick={() => themeToggle()}> Theme</button>}
      <Switch>

      <Route path="/Welcome">
        <Welcome/>
        <Expenses/>
      </Route>

      <Route path="/Login" exact>
      <AuthForm/>
      </Route>

      <Route path="/Login/forgotPassword">
      <ForgotPassword/>
      </Route>

      <Route path="/" exact>
        <Redirect to="/Login"/>
      </Route>

      <Route path="/Profile">
        <Profile/>
      </Route>

      </Switch>
    </div>
    </StyledApp>
    </ThemeProvider>
  );
}

export default App;
