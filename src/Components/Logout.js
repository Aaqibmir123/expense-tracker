import React, { useContext } from 'react'
import { Authcontent } from './store/Authcontext';


const Logout = () => {
    const Authctx = useContext(Authcontent);
   
    const logoutHandler = () => {
        Authctx.logout();
       
    }

    return (
        <button onClick={logoutHandler}>logout</button>
    )
}

export default Logout