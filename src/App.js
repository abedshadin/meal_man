
import { Route, Routes } from 'react-router-dom';

import './App.css';
import AddMember from './components/AddMember/AddMember';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

import Members from './components/Members/Members';


import All from './components/Reports/All';
import Individual from './components/Reports/Individual';
import Monthly from './components/Reports/Monthly';
import BazarPay from './components/Bazar/BazarPay';
import BazarReport from './components/Bazar/BazarReport';
import AddMeal from './components/AddMeal/AddMeal';
import KhalaReport from './components/Khala/KhalaReport';
import KhalaPay from './components/Khala/KhalaPay';
import Payment from './components/Payment/Payment';
import SPay from './components/Payment/SPay';


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/members' element={<Members />} />
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
        {/* <Route path="/payReports" element={
          <RequireAuth>
            <PayReports />
          </RequireAuth>

        } /> */}
        <Route path="/spay/:id" element={
          <RequireAuth>
            <SPay></SPay>
          </RequireAuth>
        }></Route>
        <Route path="/kpay" element={
          <RequireAuth>
            <KhalaPay></KhalaPay>
          </RequireAuth>
        }></Route>
        <Route path="/kreport" element={
          <RequireAuth>
            <KhalaReport></KhalaReport>
          </RequireAuth>
        }></Route>

      <Route path="/bpay" element={
          <RequireAuth>
            <BazarPay></BazarPay>
          </RequireAuth>
        }></Route>
        <Route path="/breport" element={
          <RequireAuth>
            <BazarReport></BazarReport>
          </RequireAuth>
        }></Route>
      </Routes>



    </div>
  );
}

export default App;
