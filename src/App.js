
import { Route, Routes } from 'react-router-dom';
import AddMeal from './AddMeal/AddMeal';
import './App.css';
import AddMember from './components/AddMember/AddMember';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Members from './Members/Members';
import Payment from './Payment/Payment';
import All from './Reports/All';
import Individual from './Reports/Individual';
import Monthly from './Reports/Monthly';


function App() {
  return (
    <div>
   <Navbar></Navbar>
     <Routes>
    <Route path='/login' element={<Login/>}  />
    <Route path='/members' element={<Members/>}  />
     <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>

        } />
     <Route path="/home" element={
          <RequireAuth>
            <Home />
          </RequireAuth>

        } />
     <Route path="/add_member" element={
          <RequireAuth>
            <AddMember />
          </RequireAuth>

        } />
          <Route path="/add_meal" element={
          <RequireAuth>
            <AddMeal />
          </RequireAuth>

        } />
          <Route path="/individual" element={
          <RequireAuth>
            <Individual />
          </RequireAuth>

        } />
          <Route path="/all" element={
          <RequireAuth>
            <All />
          </RequireAuth>

        } />
          <Route path="/monthly" element={
          <RequireAuth>
            <Monthly />
          </RequireAuth>

        } />

<Route path="/pay" element={
          <RequireAuth>
            <Payment />
          </RequireAuth>

        } />


     </Routes>
       
      

    
    </div>
  );
}

export default App;
