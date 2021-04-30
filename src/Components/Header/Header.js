import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContextData } from '../ContextProvider/ContextProvider';
import { getCookie } from '../SignupAndSignin/Signin/SigninHelper';

const Header = () => {
   const history = useHistory()
   const {user, toastMessage, signout} = useContextData()

   // // Automatically Logout Signed User 
   // const token = getCookie('myBlogToken');
   // useEffect(() => {
   //    if (!token) {
   //       toast.error('Your Session Is Timeout. Please SignIn Again')
   //       signout(history)
   //    }
   // }, [!token])
   
   // Make Logical Navigation var
   const logicalNav = () => {
      if (user) {
         return [
            <li className="nav-item active">
               <Link className="nav-link" to="/">Home</Link>
            </li>,
            <li className="nav-item">
               <Link className="nav-link"  to="/following-user-article">Followed Articles</Link>
            </li>,
            <li className="nav-item">
               <Link className="nav-link"  to="/bookmarks">Bookmarks</Link>
            </li>,
            <li className="nav-item">
               <Link className="nav-link"  to="/user/profile"> {user.username} </Link>
            </li>
         ]
      }else{
         return [
            <li className="nav-item">
               <Link className="nav-link"  to="/login">Log in</Link>
            </li>
         ]
      }
   }

   return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
         {toastMessage()}
         <div class="container container-fluid">
            <Link className="navbar-brand" to="/" >
               <h3>My Blog</h3>
            </Link>

            <button 
               class="navbar-toggler" 
               data-bs-toggle="collapse" 
               data-bs-target="#navbarNavDropdown" 
               aria-controls="navbarNavDropdown" 
               aria-expanded="false" 
               aria-label="Toggle navigation"
            >
               <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav ms-auto">
                  {logicalNav()}
               </ul>
               {
                  !user && 
                  <Button
                     variant='contained'
                     className="createAccountBtn"
                  >
                     <Link to="/signup">Create Account</Link>
                  </Button>
               }
            </div>
         </div>
      </nav>
   );
};

export default Header;