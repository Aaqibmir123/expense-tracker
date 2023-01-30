import React, { useContext, useRef } from 'react'
import {  useNavigate } from 'react-router';
import { Authcontent } from './store/Authcontext';

import './style.css';
export const Login = () => {
   const  navigation = useNavigate();
    
    const ctx=useContext(Authcontent);
    const inputEmailref = useRef();
    const inputpasswordref = useRef();

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
            console.log(data.idToken);
            ctx.login(data.idToken);
            
          

        }).catch((err)=>{
            alert(err.message);
        })
       

    }

    return (
        <>
            <form id='form' onSubmit={submithandler}>
                <h2>Login</h2>
                <input type='email' placeholder='email' ref={inputEmailref} />
                <input type='password' placeholder='password' ref={inputpasswordref} />
                <button className='btn'>Login</button>
            </form>



        </>
    )
}
