import React, { useRef, useState } from 'react'

export const Addexpenses = () => {
  const [expense, setexpense] = useState([]);

  const Addmoneryref = useRef();
  const Adddescref = useRef();
  const addcatagoerref = useRef();


  const submithandler = (e) => {
    e.preventDefault();  
    const EnterdMoneyValue = Addmoneryref.current.value;
    const EnterDescfvalue = Adddescref.current.value;
    const EnteredCatagoryvalue = addcatagoerref.current.value;
    console.log(EnterdMoneyValue, EnterDescfvalue, EnteredCatagoryvalue)
    setexpense((preState) => {
      return [...preState,
      { money: EnterdMoneyValue, Desc: EnterDescfvalue, Catagory: EnteredCatagoryvalue }]

    })

  }
  return (
    <div>
      <form >
        <label htmlFor=''>Add Money</label>
        <input type='text' ref={Addmoneryref} /><br />
        <label htmlFor=''>Add Desc</label>
        <input type='text' ref={Adddescref} /><br />
        <label htmlFor=''>Catagory</label>
        <select ref={addcatagoerref} >
          <option >Food</option>
          <option >Petrol</option>
          <option >Salary</option>
          <option >Car</option>
        </select>
        <br /><br />
        <button onClick={submithandler}>Add Expenses</button>

      </form>
      <ul>
        {expense.map((items) => {
          return (
            <div key={Math.random().toString()}>
              <li >{items.money}</li>
              <li>{items.Desc}</li>
              <li>{items.Catagory}</li>
            </div>
          )
        })}
      </ul>





    </div>
  )
}
