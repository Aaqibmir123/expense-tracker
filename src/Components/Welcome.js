
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Addexpenses } from './Addexpenses';
import { Authcontent } from './store/Authcontext';

export const Welcome = () => {
    const Authctx = useContext(Authcontent);
    const token = Authctx.token;
    const navigater = useNavigate();
    const profileHandler = () => {
        navigater('/profile');
    }

        const emailVerfication=()=>{
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w',{
             method:'POST',
             body:JSON.stringify({
                requestType	:'miraaqib514@gmail.com',
                idToken	:token
             }).then((res)=>{
                return res.json();
             }).then((data)=>{
                console.log(data)
             })
            })

        }
   

    return (
            <div>
                <h1>welcome</h1>
                <p>Your profile is incomplete</p>
                <button onClick={profileHandler}>Complete your profile</button>
                <button onClick={emailVerfication}>Verify email</button>
                <Addexpenses />
            </div>
        )
    }
