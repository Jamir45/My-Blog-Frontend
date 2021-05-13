import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Button, Badge } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useContextData } from '../../ContextProvider/ContextProvider';

const HoverMenu = ({signout, user}) => {
   const {userData} = useContextData()
   const history = useHistory()

   return (
      <Paper className='profileDashboard' elevation={3}>
         <p><Link to='/user/profile'>{user && user.username}</Link></p>
         <ul>
            <li> <Link to='/dashboard'><DashboardIcon /> Dashboard</Link> </li>
            <li> <Link to='/create/article'><CreateIcon /> Create Article</Link> </li>
            <li> 
               <Link to='/bookmarks'>
                  <BookmarkIcon/> Bookmarks
                  <Badge 
                     className='badge' 
                     badgeContent={userData && userData.bookmarks ? userData.bookmarks.length : 0} color="secondary">
                  </Badge>
               </Link> 
            </li>
            <li> <Link to=''><SettingsIcon /> Setting</Link> </li>
         </ul>
         <Button onClick={() => signout(history)}>
            <ExitToAppIcon /> Sign Out
         </Button>
      </Paper>
   );
};

export default HoverMenu;