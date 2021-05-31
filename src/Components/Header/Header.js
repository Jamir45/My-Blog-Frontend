import React from 'react';
import { Avatar, Badge, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContextData } from '../ContextProvider/ContextProvider';
import HoverMenu from './HoverMenu/HoverMenu';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import { useForm } from 'react-hook-form';
import SearchIcon from '@material-ui/icons/Search';


const Header = () => {
   const {
      user, 
      toastMessage, 
      signout, 
      userData, 
      setPopularArticle
   } = useContextData()

   // Make Logical Navigation var
   const logicalNav = () => {
      if (user) {
         return [
            <li onClick={() => setPopularArticle(false)} className="nav-item">
               <Link className="nav-link headerBtn" to="/">Home</Link>
            </li>,
            <li className="nav-item">
               <Link className="nav-link headerBtn" to="/bookmarks">
                  Bookmarks
                  <Badge 
                     className='badge' 
                     badgeContent={userData && userData.bookmarks ? userData.bookmarks.length : 0} 
                     color="secondary"
                  >
                  </Badge>
               </Link>
            </li>,
            <li className="nav-item Profile">
               <Avatar alt="Remy Sharp" src={user && user.profilePic} />
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

   const { register, handleSubmit, errors, watch } = useForm();   
   const onSubmit = data => { 
      console.log(data)
   } 

   return (
      <div className="topMenu">
         <nav class="navbar navbar-expand fixed-top shadow-sm navbar-light">
            {toastMessage()}
            <div class="container container-fluid">
               <SidebarMenu signout={signout} user={user}/>
               <Link onClick={() => setPopularArticle(false)} className="navbar-brand" to="/" >
                  <h4>MY <span>BLOG</span></h4>
               </Link>
               
               <div class="collapse navbar-collapse">
                  <form class="searchForm" onSubmit={handleSubmit(onSubmit)}>
                     <input 
                        class="form-control" 
                        type="text" 
                        name="search"
                        placeholder="Search" 
                        ref={register()} 
                     />
                     <Button 
                        className='searchBtn'
                        type="submit"
                     >
                        <SearchIcon /> Search
                     </Button>
                  </form>
                  <ul className="d-none d-md-block d-md-flex navbar-nav ms-auto">
                     {logicalNav()}
                  </ul>
                  <ul className="d-block d-md-none navbar-nav ms-auto">
                     {
                        user ? 
                        <li className="nav-item Profile">
                           <Avatar src={user && user.profilePic} />
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