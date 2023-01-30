import React, { useContext, useRef } from 'react'
import { Authcontent } from './store/Authcontext';

export const Completeprofile = () => {

    const inputText = useRef();
    const inputFile = useRef();


    const ctx = useContext(Authcontent);

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
            <input type='text' name='name' ref={inputText} />
            <input type='email' name='file' ref={inputFile} />
            <button onClick={UpdateProfile}>update</button>

        </div>
    )
}


