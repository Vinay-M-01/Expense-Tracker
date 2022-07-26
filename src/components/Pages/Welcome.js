import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../store";
import { useDispatch } from "react-redux/es/exports";

const Welcome = (props) => {
  const dispatch = useDispatch()

    const history  = useHistory();
    function logoutHandler(){
        localStorage.clear();
        history.replace('/Login')
        dispatch(authActions.logout())
    };
  return (
    <>
    <button onClick={logoutHandler} style={{backgroundColor:"GrayText", borderRadius:"4px", padding: "5px"}}> LogOut  </button>
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <span
        style={{
          fontFamily: "sans-serif",
          fontSize: "large",
          fontStyle: "italic",
        }}
      >
        Welcome to Expense Tracker!!!
      </span>
      <span
        style={{
          float: "right",
          border: "1px solid black",
          borderRadius: "7px",
          fontStyle: "italic",
          backgroundColor: "lightgray",
          width:"340px"
        }}
      >
        {" "}
        Your profile is incomplete :
        <Link to="/Profile"
          style={{
            color: "blue",
            border: "none",
            fontSize: "17px",
            fontStyle: "italic",
            backgroundColor: "lightgray",
          }}
        >
        Complete now!
        </Link>
      </span>
    </div>
    </>
  );
};

export default Welcome;
