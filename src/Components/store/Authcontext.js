import React, { useState } from 'react'
import { createContext } from 'react';

 export const Authcontent=React.createContext({
    token:"",
    islogined:false,
    login:(token)=>{},
    logout:()=>{}

});


export const Authcontextprovider=(props)=>{
    const [token,settoken] = useState(null);
    const userislogined =!!token;
    const loginhandler=(token)=>{
        settoken(token);
    }

    const logoutHandler=()=>{
        settoken(null);
    }

    const contextvalue={
        token:token,
        islogined:userislogined,
        login:loginhandler,
        logout:logoutHandler
    }



    return(
        <Authcontent.Provider  value={contextvalue}>
            {props.children}
        </Authcontent.Provider>
    )
}
