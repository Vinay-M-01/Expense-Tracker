
import classes from './ForgotPassword.module.css'
import { useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

const ForgotPassword = (props) => {
    const history = useHistory()
    const emialInputRef = useRef()
    const [isLoading, setIsLoading] = useState(false)

    const submitPasswordHandler =(e) => {
        e.preventDefault()
        const enteredEmail = emialInputRef.current.value
        console.log(enteredEmail)
        setIsLoading(true)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-3XCAdzpwYYUEDVAj_KcDkgVwz4d57OU', {
            method:"POST",
            body: JSON.stringify({
                requestType	: "PASSWORD_RESET" ,
                email : enteredEmail,
            })
        }).then(res=>{
            setIsLoading(false)
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data => {
                    let errorMessage = 'Reset Request Failed';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then((data) =>{
            alert(" Request sent to your Email, Please check!")
            history.replace('/Login')
        }).catch((err) =>{
            alert(err.errorMessage)
          })
    }


    return(
        <section className={classes.auth}>
      <h1>Forgot Password</h1>
      
      <form onSubmit={submitPasswordHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInputRef}/>
        </div>
        
        <div className={classes.actions}>
          {!isLoading && <button>Change Password</button>}
          {isLoading && <p> Sending Request...!</p>}
          <p> Already a user ? <Link to="/Login">Login</Link></p>
        </div>
      </form>
    </section>
    )
}
 
export default ForgotPassword;