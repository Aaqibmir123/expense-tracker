
import './App.css';
import { Navbars } from './Components/Navbars';
import { Login } from './Components/Login';
import Signup from './Components/Signup';
import {Routes,Route } from 'react-router-dom';
import { Welcome } from './Components/Welcome';
import { Completeprofile } from './Components/Completeprofile';

function App() {
  return (
    <div className="App">
    
    <Navbars />
      <Routes>
        
          {/* <Route path="/" element={<Navbars/>} /> */}
          <Route path='/profile' element = {<Completeprofile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path='/welcome' element={<Welcome/>} />
        
      </Routes>
   
     
    </div>
  );
}

export default App;
