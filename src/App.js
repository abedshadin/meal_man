
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddMember from './components/AddMember/AddMember';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div>
   <Navbar></Navbar>
     <Routes>
    
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


     </Routes>
       
      

    
    </div>
  );
}

export default App;
