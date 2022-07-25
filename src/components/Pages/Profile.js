
import { useRef } from "react";


const Profile = (props) => {

    const enteredNameRef = useRef()
    const enteredPhotoUrlRef = useRef()

    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('Hello, form is working')

        const enteredName = enteredNameRef.current.value;
        const enteredPhotoURL = enteredPhotoUrlRef.current.value

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-3XCAdzpwYYUEDVAj_KcDkgVwz4d57OU'

        fetch(url, {
            method:"POST",
            body:JSON.stringify({
                idToken: localStorage.getItem('token'),
                displayName:enteredName,
                photoUrl:enteredPhotoURL,
                returnSecureToken:true
            })
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(data => {
            console.log(data)
        })
        .catch(err => console.log(err.message))
    }
    return(
        <form onSubmit={submitHandler}>
            <h2> Contact Details</h2>
            <button> Cancel </button>
            <div>
                <span>
                    <label htmlFor="fullName">Full Name: </label>
                    <input type="text" ref={enteredNameRef} />
                </span>
                <span>
                    <label htmlFor="profilePhoto">Profile Photo URL: </label>
                    <input type="link" ref={enteredPhotoUrlRef} />
                </span>
            </div>
            <button type="submit" className="update"> Update </button>
        </form>
    )
}
 
export default Profile;