import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';
import { Expensescontext } from './store/Expensescontext';
import { Userdata } from './Userdata';
export const Addexpenses = () => {
  // const [expense, setexpense] = useState([]);
  const Authctx = useContext(Expensescontext);
  console.log(Authctx.item);
  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();


  const submithandler = (e) => {
    e.preventDefault();
    const EnterdMoneyValue = Addmoneryref.current.value;
    const EnterDescfvalue = Adddescref.current.value;
    const EnteredCatagoryvalue = addcatagoerref.current.value;
    // console.log(EnterdMoneyValue, EnterDescfvalue, EnteredCatagoryvalue);


    // setexpense((preState) => {
    //   return [...preState,
    //   { money: EnterdMoneyValue, Desc: EnterDescfvalue, Catagory: EnteredCatagoryvalue }]

    // })


    //use firebase

    let url = "https://expense-tracker-f1216-default-rtdb.firebaseio.com/expenses.json";
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        EnterdMoneyValue,
        EnterDescfvalue,
        EnteredCatagoryvalue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {

        return res.json();
      }
    }).then((data) => {
      console.log(data);
    })

  }

  //Get request to the firebase

  async function GetUserData(e) {

    // const itemList = [];


    e.preventDefault();
    const Response = await axios.get('https://expense-tracker-f1216-default-rtdb.firebaseio.com/expenses.json');
    const data = await Response.data;
    // console.log(data);
    // for (let i = 0; i < data.length; i++) {
    //   Authctx.addItems({
    //     money: data[i].EnterdMoneyValue, 
    //     desc: data[i].EnterDescfvalue,
    //     catagory: data[i].EnteredCatagoryvalue
    //   });

    const newData = [];
    for (let key in data) {
      newData.push({id:key, ...data})
    }
    Authctx.addItems(newData);




    //}

    // console.log(Authctx.addItems());

  }



  return (
    <div>
      <form >
        <label htmlFor=''>Add Money</label>
        <input type='text' ref={Addmoneryref} placeholder="Add Money" /><br />
        <label htmlFor=''>Add Desc</label>
        <input type='text' ref={Adddescref} placeholder="Desc" /><br />
        <label htmlFor=''>Catagory</label>
        <select ref={addcatagoerref} >
          <option >Food</option>
          <option >Petrol</option>
          <option >Salary</option>
          <option >Car</option>
        </select>
        <br /><br />
        <button onClick={submithandler}>Add Expenses</button>
        <button onClick={GetUserData}>Get data</button>
      </form>
      <ul>
       <Userdata />
      </ul>

    </div>
  )
}
