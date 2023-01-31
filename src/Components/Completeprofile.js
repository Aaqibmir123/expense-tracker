import React, { useContext, useEffect, useRef } from 'react'
import { Authcontent } from './store/Authcontext';

export const Completeprofile = () => {

    const inputText = useRef();

    const inputFile = useRef();

    const ctx = useContext(Authcontent);

    const token = ctx.token;
    console.log(ctx.token);

    useEffect(()=>{
        getuserdata();
    },[]);



   const getuserdata=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w',{
        method:'POST',
        body:JSON.stringify({
            idToken:token
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        inputText.current.value = data.users[0].displayName;
        inputFile.current.value =data.users[0].photoUrl;
        console.log(data.users[0].displayName,data.users[0].photoUrl)
    })
   }

   
    const UpdateProfile = () => {
        const enterName = inputText.current.value;
        const enterFile = inputFile.current.value;
        
        console.log(ctx.token);
        const token = ctx.token;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: enterName,
                photoUrl: enterFile,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgs87SFNNhZ1bqnMLpJbkcggMhWmDsZ1w', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
                        displayName: enterName,
                        photoUrl: enterFile
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(res => {
                    console.log(res);
                })
                return res.json();

            }
            // else {
            //     return res.json().then(() => {
            //         let errorMessage = "failed";
            //         throw new Error(errorMessage);
            //     })
            // };
        }).then((data) => {
            console.log(data);


        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <div>
            
            <input type='text' name='name' ref={inputText}  />
            <input type='email' name='file' ref={inputFile} />
            <button onClick={UpdateProfile}>update</button>


        </div>
    )
}


