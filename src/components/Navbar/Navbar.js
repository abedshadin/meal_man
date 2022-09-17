import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
const Navbar = () => {
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabindex="0" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li tabindex="0">
          <a className="justify-between">
            Parent
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div><img src="favicon.ico" alt="" width={50} height={50}/>
    <a className="font-bold normal-case text-xl">MeaL_MaN</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
      
 

      <li className='mr-1'>    <NavLink to="/" className="btn">Home</NavLink></li>
      <li className='mr-1'>    <NavLink to="/add_member" className="btn">Add Member</NavLink></li>
      <li className='mr-1'>    <NavLink to="/add_meal" className="btn">Add Meal</NavLink></li>
      <li className='mr-1'>    <NavLink to="/members" className="btn">Members</NavLink></li>
      <li className='mr-1'>    <NavLink to="/individual" className="btn">Individual</NavLink></li>
      <li className='mr-1'>    <NavLink to="/all" className="btn">All</NavLink></li>
      <li className='mr-1'>    <NavLink to="/pay" className="btn">Pay</NavLink></li>
      <li className='mr-1'>    <NavLink to="/kpay" className="btn">Khala Pay</NavLink></li>
      <li className='mr-1'>    <NavLink to="/kreport" className="btn">Khala Repo</NavLink></li>

   
    
    
    </ul>
  </div>

 <div className="navbar-end">
 {user &&
  <button onClick={logout} className='mr-1'>    <NavLink to="/login" className="btn">Log Out</NavLink></button>
 }
  </div>
 
</div>
        </div>
    );
};

export default Navbar;