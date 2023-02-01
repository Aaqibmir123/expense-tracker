import React, { useContext } from 'react'
import { Expensescontext } from './store/Expensescontext'

export const Userdata = () => {

  const Authctx  =  useContext(Expensescontext);
  console.log(Authctx.item[0]);
  return (
    <div>
        {Authctx.item.map((items)=>{
            console.log(items);
            return (
                <li key={Math.random()}>
                    {items[0].EnteredCatagoryvalue}
                    {items[0].EnterDescfvalue}
                    {items[0].EnterdMoneyValue}
                </li>
            )
        })}


    </div>
  )
}
