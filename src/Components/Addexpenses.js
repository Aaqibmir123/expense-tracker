import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Expensescontext } from './store/Expensescontext';
import "./style.css";

export const Addexpenses = () => {
  const [data, setdata] = useState([]);
  const Authctx = useContext(Expensescontext);
  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();


  //In JavaScript,
  //  the variable userdata is being
  //  assigned the boolean value of
  //   false. This means 
  //   that the value of
  //    userdata is either 
  //    true or false, and in
  //     this case it is false.
  //      This can be used to
  //       indicate a certain state
  //        or condition in a program, such as whether a user is 
  //        logged in or not.
  let userdata = false;

  //users info we ll store id in it later
  let userInfo = "";

  function getuserData() {
    fetch('https://expense-tracker-f1216-default-rtdb.firebaseio.com/expenses.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      }).then((datas) => {
        //console.log(datas);
        const result = [];
        for (let key in datas) {
          result.push({ id: key, ...datas[key] });
          //console.log(key);
        }
        console.log(result);
        setdata(result);
      })
  };

  const submithandler = (e) => {
    e.preventDefault();
    let EnterdMoneyValue = Addmoneryref.current.value;
    let EnterDescfvalue = Adddescref.current.value;
    let EnteredCatagoryvalue = addcatagoerref.current.value;
    // console.log(EnterdMoneyValue, EnterDescfvalue, EnteredCatagoryvalue);


    // setexpense((preState) => {
    //   return [...preState,
    //   { money: EnterdMoneyValue, Desc: EnterDescfvalue, Catagory: EnteredCatagoryvalue }]

    // })


    //use firebase

    if (userdata) {
      axios.put(`https://expense-tracker-f1216-default-rtdb.firebaseio.com/expenses/${userInfo}.json`, {
        EnterdMoneyValue,
        EnterDescfvalue,
        EnteredCatagoryvalue
      })

        .then((data) => {
          // console.log(data);
          userdata = false;
          userInfo = "";
          Authctx.update(data.data);
          console.log(data.data);


        }).catch((error) => {
          console.log(error);
        })
    }
    else {

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
        // console.log(data);
      });
      getuserData();
    }
  }


  //Get request to the firebase



  useEffect(() => {
    getuserData();
  }, [])



  const deleteData = async (id) => {
    // console.log('hello delete', id)
    const response = await
      axios.delete(`https://expense-tracker-f1216-default-rtdb.firebaseio.com/expenses/${id}.json`);
    // console.log(response);
    getuserData();
  }

  const updateData = (id) => {
    //finds the index if matches than update tha value
    const index = data.findIndex((item) => item.id === id);
    //it will display data in the input boxes
    Addmoneryref.current.value = data[index].EnterdMoneyValue;
    Adddescref.current.value = data[index].EnterDescfvalue;
    addcatagoerref.current.value = data[index].EnteredCatagoryvalue;

    //console.log(data[index].EnterdMoneyValue, data[index].EnterDescfvalue, data[index].EnteredCatagoryvalue);

    //when update function is called than userdata should be updated trues
    userdata = true;

    //stores id there
    userInfo = id;
    //console.log(userId, "user id", index);
    // console.log(data)
  }




  return (
    <div>
      <form className='form'>
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
        <button onClick={submithandler} className="btn">Add Expenses</button>


      </form>
      <ul >
        {data.map((items) => {
          return (
            <li key={Math.random()}>
              {items.EnterdMoneyValue} {items.EnterDescfvalue} {items.EnteredCatagoryvalue}
              <button onClick={() => { updateData(items.id) }}>Edit</button>
              <button onClick={() => deleteData(items.id)}>Delte</button>
            </li>
          )
        })}
      </ul>
      {console.log(data)}
    </div>
  )
}




//when i delete my data it deletes on firebase not on screen at the same time on refresh it deletes in react



//crud operation using react