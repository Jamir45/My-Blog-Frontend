import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useContextData } from '../../ContextProvider/ContextProvider';
import { Badge } from '@material-ui/core';


const SidebarMenu = ({signout, user}) => {
   const history = useHistory()
   const {userData} = useContextData()

   // Toggle Navigation Bar on Left
   const [state, setState] = React.useState({left: false});
   const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
   };

   const list = (anchor) => (
      <div
        role="presentation"
        className="sidebarDiv"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
         {
            user ? 
            <>
            <p> {user.username} </p>
            <Divider />
            <List className="sidebarMenu">
               <ListItem button>
                  <HomeIcon/> 
                  <Link to="/" className="ml-3" >
                     Home
                  </Link> 
               </ListItem>
               <ListItem button>
                  <DashboardIcon/> 
                  <Link to="/user/dashboard" className="ml-3" >
                     Dashboard
                  </Link> 
               </ListItem>
               <ListItem button>
                  <CreateIcon/> 
                  <Link to="/create/article" className="ml-3" >
                     Create Article
                  </Link> 
               </ListItem>
               <ListItem button>
                  <AssignmentIcon/> 
                  <Link to="/popular-article" className="ml-3" >
                     Popular Article
                  </Link> 
               </ListItem>
               <ListItem button>
                  <SupervisorAccountIcon/> 
                  <Link to="/popular-author" className="ml-3" >
                     Popular Author
                  </Link> 
               </ListItem>
               <ListItem button>
                  <BookmarkIcon/> 
                  <Link to="/bookmarks" className="ml-3" >
                     Bookmarks
                     <Badge 
                        className='badge' 
                        badgeContent={userData && 
                        userData.bookmarks ? 
                        userData.bookmarks.length : 0
                        } 
                        color="secondary">
                     </Badge>
                  </Link> 
               </ListItem>
               <ListItem button>
                  <SettingsIcon/> 
                  <Link to="" className="ml-3" >
                     Setting
                  </Link> 
               </ListItem>
            </List>
            <Divider />
            <List>
               <ListItem onClick={() => signout(history)} button>
                  <ExitToAppIcon /> Sign Out
               </ListItem>
            </List>
            </> : 
            <>
            <p> MY BLOG </p>
            <Divider />
            <List className="sidebarMenu">
               <ListItem button>
                  <HomeIcon/> 
                  <Link to="/" className="ml-3" >
                     Home
                  </Link> 
               </ListItem>
               <ListItem button>
                  <AssignmentIcon/> 
                  <Link to="/popular-article" className="ml-3" >
                     Popular Article
                  </Link> 
               </ListItem>
               <ListItem button>
                  <SupervisorAccountIcon/> 
                  <Link to="/popular-author" className="ml-3" >
                     Popular Author
                  </Link> 
               </ListItem>
               <ListItem button>
                  <AccountBoxIcon/> 
                  <Link to="/signup" className="ml-3" >
                     Signup
                  </Link> 
               </ListItem>
               <ListItem button>
                  <AccountCircleIcon/> 
                  <Link to="/login" className="ml-3" >
                     login
                  </Link> 
               </ListItem>
            </List>
            </>
         }
      </div>
   );

   return (
      <div className='d-block d-md-none'>
         <React.Fragment key={"left"}>
            <MenuIcon id="menuIcon" onClick={toggleDrawer("left", true)} />
            <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
               {list("left")}
            </Drawer>
         </React.Fragment>
      </div>
   );
};

export default SidebarMenu;