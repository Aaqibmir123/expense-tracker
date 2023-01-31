import React, { useContext, useRef,useState } from 'react'
import {  useNavigate } from 'react-router';
import { Authcontent } from './store/Authcontext';

import './style.css';
export const Login = () => {
   const  navigation = useNavigate();
    const ctx=useContext(Authcontent);

    const [email, SetEmail] = useState();

    const updateEmail = (e) => {
        SetEmail(e.target.value);
       

    }
  
    const inputEmailref = useRef();
    const inputpasswordref = useRef();


    //forget password handler

    const ForgetPasswordHandler=()=>{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w',{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:localStorage.getItem('email')
            }),
            headers:{
                "Content-Type" :"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
        })
    }

    const submithandler = (e) => {
        e.preventDefault();
        const enteremail = inputEmailref.current.value;
        const enterpassword = inputpasswordref.current.value;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w'

        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteremail,
                password:enterpassword
            }),
            headers :{
                'Content-Type' :"application.json"
            }
        }).then(res=>{
            if(res.ok){
                navigation('/welcome');
                return res.json();
            }
            else{
                return res.json().then((data)=>{
                    let errorMessaege="auth needed";
                    throw new  Error(errorMessaege);
                    
                });
            }
        }).then((data)=>{
            console.log("email", data.email)
            ctx.login(data.idToken,data.email);
            localStorage.setItem('email',email);
        }).catch((err)=>{
            alert(err.message);
        })
       

    }

    return (
        <>
          <div>
          <form id='form' onSubmit={submithandler}>
                <h2>Login</h2>
                <input type='email' placeholder='email' ref={inputEmailref}
                onChange={updateEmail} />
                <input type='password' placeholder='password' ref={inputpasswordref} />
                <button className='btn'>Login</button><br/>
            </form>
            <button onClick={ForgetPasswordHandler} className="btn-forget">Forget password</button>
          </div>



        </>
    )
}
