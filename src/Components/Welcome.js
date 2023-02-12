
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Addexpenses } from './Addexpenses';
import { Authcontent } from './store/Authcontext';
import './style.css';
export const Welcome = () => {
    const Authctx = useContext(Authcontent);
   
    const navigater = useNavigate();
    const profileHandler = () => {
        navigater('/profile');
    }

    const userEmail= localStorage.getItem('email');
    const tokens = localStorage.getItem('token');
    console.log(tokens)

    const emailVerfication = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w', {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: tokens,
                email:userEmail
                
            }),
            headers:{
                'Content-Type':'application/json'
            },
                
                })
                .then((res) => {
                    if(!res.ok){
                        return res.json();
                    }
                }).then((data) => {
                    console.log(data)
        }).catch((error)=>{
            console.log(error);
        })

    }

    return (
        <>
            <button onClick={profileHandler} id="profile">Complete your profile</button>
            <button onClick={emailVerfication} id="profile-2">Verify email</button>
            <div className='form'>
                <h1>welcome</h1>
                <p>Your profile is incomplete</p>
                <Addexpenses />
            </div>

        </>
    )
}




