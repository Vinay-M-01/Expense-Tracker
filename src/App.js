import { Redirect, Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Welcome from "./components/Pages/Welcome";

function App() {
  return (
    <div>
      <Route path="/Welcome">
        <Welcome/>
      </Route>
      <Route path="/Login">
      <AuthForm/>
      </Route>
      <Route path="/">
        <Redirect to="/Login"/>
      </Route>
    </div>
  );
}

export default App;
