
import { useRef, useState, useEffect } from "react";


const Profile = (props) => {

    const [userName,setuserName] = useState('')
    const [link, setLink]  = useState('');
    const [notVerified, setNotVerified] = useState(true);

    const enteredNameRef = useRef()
    const enteredPhotoUrlRef = useRef()
    
    // Editing the user details- fetching data on reload
    async function getBackData(){
        console.log('Async Function')
        const response =  await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-3XCAdzpwYYUEDVAj_KcDkgVwz4d57OU',
        {
            method:'POST',
            body:JSON.stringify({
                idToken:localStorage.getItem('token') 
            })
        })

        const data = await response.json()
        console.log(data)
        setuserName(data.displayName)
        setLink(data.photoUrl)
        data.emailVerified && setNotVerified(false)
        
    } 

    useEffect(()=>{
        getBackData()
    },[])

    // Verify the User email by sending a verification link to there respective email id 
    const verifyEmailHandler =()=>{
   fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-3XCAdzpwYYUEDVAj_KcDkgVwz4d57OU',
        {
            method:'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: localStorage.getItem('token'),

            })
        }).then(res=>{
            if(res.ok){
                alert('Email ID Verified')
                res.json()
            }else{
                throw new Error('Authentication Failed');
            }
        }).catch(
            err=>{
                console.log(err)

            }
        )
    }

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
                    <input type="text" ref={enteredNameRef} defaultValue={userName} />
                </span>
                <span>
                    <label htmlFor="profilePhoto">Profile Photo URL: </label>
                    <input type="link" ref={enteredPhotoUrlRef} defaultValue={link}/>
                </span>
            </div>
            <button type="submit" className="update"> Update </button>
            {notVerified && <button onClick={verifyEmailHandler}> Verify Email</button>}
        </form>
    )
}
 
export default Profile;