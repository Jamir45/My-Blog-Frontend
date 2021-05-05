import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import HoverMenu from './HoverMenu/HoverMenu';
import SidebarMenu from './SidebarMenu/SidebarMenu';


const Header = () => {
   const {user, toastMessage, signout, userData, setPopularArticle} = useContextData()
   
   // Make Logical Navigation var
   const logicalNav = () => {
      if (user) {
         return [
            <li onClick={() => setPopularArticle(false)} className="nav-item">
               <Link className="nav-link headerBtn" to="/">Home</Link>
            </li>,
            <li className="nav-item">
               <Link className="nav-link headerBtn"  to="/bookmarks">Bookmarks</Link>
            </li>,
            <li className="nav-item Profile">
               <Avatar alt="Remy Sharp" src={userData && userData.profilePic} />
               <HoverMenu signout={signout} user={user} />
            </li>,
         ]
      }else{
         return [
            <li className="nav-item">
               <Link className="nav-link headerBtn"  to="/login">Log in</Link>
            </li>
         ]
      }
   }

   return (
      <div className="topMenu">
         <nav class="navbar navbar-expand fixed-top navbar-light bg-light">
            {toastMessage()}
            <div class="container container-fluid">
               <SidebarMenu signout={signout} user={user}/>
               <Link onClick={() => setPopularArticle(false)} className="navbar-brand" to="/" >
                  <h4>My Blog</h4>
               </Link>

               <div class="collapse navbar-collapse">
                  <ul className="d-none d-md-block d-md-flex navbar-nav ms-auto">
                     {logicalNav()}
                  </ul>
                  <ul className="d-block d-md-none navbar-nav ms-auto">
                     {
                        user ? 
                        <li className="nav-item Profile">
                           <Avatar src={userData && userData.profilePic} />
                           <HoverMenu signout={signout} user={user} />
                        </li> : 
                        <li className="nav-item">
                           <Link className="nav-link headerBtn"  to="/login">Log in</Link>
                        </li>
                     }
                  </ul>
                  {
                     user ? 
                     <Button
                        variant='contained'
                        className="createAccountBtn d-none d-md-block"
                     >
                        <Link to="/create/article">Create Article</Link>
                     </Button> :
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
      </div>
   );
};

export default Header;