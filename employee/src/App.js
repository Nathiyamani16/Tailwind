
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from "./LoginPage/LoginPage"
import Home from './Employee/Admin';
import Dashboard from './Employee/Dashboard';
import Profile from './User/Profile';
import About from './User/UserAbout';
import LeaveRequest from './User/LeaveRequest';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path='/*' element={<LoginPage/>}/>
        <Route path='/admin/*' element={<Home/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='/user/*' element={<Profile/>}/>
        <Route path="/user/about" element={<About/>} />
        <Route path='/user/leaverequest' element={<LeaveRequest/>}/>
      
      </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
