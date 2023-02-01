import React, { useState } from "react";
import { createContext } from "react";
 export const Expensescontext = React.createContext({
    addItems:(items)  => {}
});

export const Authcontextproviders=(props)=>{
    const [item,setitems] = useState([]);

       //for adding the items in the handler 
    const AdditemHandler=(items)=>{
        setitems((prestate)=>{
            return (
                [...prestate,items]
            )
        })
           
    }

    // console.log(item);
   
    const contextvalue = {
        addItems:AdditemHandler,
        item:item
        
    }


    return(
        <Expensescontext.Provider value={contextvalue}>
            {props.children}
        </Expensescontext.Provider>
    )
}