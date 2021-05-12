import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Paper } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import FormLoading from '../../../Loading/FormLoading';
import { useContextData } from '../../../ContextProvider/ContextProvider';
import ArticleHandler from '../../../ContextProvider/Handler/ArticleHandler';
import LikeCommentHandler from '../../../ContextProvider/Handler/LikeCommentHandler';

const useStyles = makeStyles((theme) => ({
   root: {
      position: 'relative',
   },
   dropdown: {
      position: 'absolute',
      top: 40,
      right: 0,
      // left: 0,
      zIndex: 1,
      width: 90,
      backgroundColor: theme.palette.background.paper,
   },
}));

const MoreButton = (props) => {
   const classes = useStyles();
   const {_id, user, author, readTime} = props;
   const {formLoader, userData, setFormLoader} = useContextData()
   const {bookmarkPost} = LikeCommentHandler()
   const {deleteArticle} = ArticleHandler()
   
   const [open, setOpen] = React.useState(false);
   const handleClick = () => {
      setOpen((prev) => !prev);
   };
   const handleClickAway = () => {
      setOpen(false);
   };

   const [popupOpen, setPopupOpen] = useState(false);
   const handleClickOpen = () => {
      setPopupOpen(true);
   };
   const handleClose = () => {
      setPopupOpen(false);
   };

   const [bookmarked, setBookmarked] = useState(null)
   useEffect(() => {
      if (userData) {
         const data = userData.bookmarks.find(bookmark => bookmark._id === _id)
         setBookmarked(data)
      }
   }, [userData])

   return (
      <>
      <ClickAwayListener onClickAway={handleClickAway}>
         <div className={classes.root}>
            <span> {readTime} </span>
            <Button
               onClick={() => bookmarkPost(_id, 'bookmark')}
               className={bookmarked ? 'bookmarked' : 'saveButton'}
            > 
               {bookmarked ? 'Saved' : 'Save'}
            </Button> 
            {
               user && user.userId === author &&
               <IconButton type="button" onClick={handleClick} className="iconButton">
                  <MoreHorizIcon />
               </IconButton>
            }
            {open ? (
               <Paper elevation={3} className={classes.dropdown}>
                  <Button color="primary"> 
                     <Link to={`/article/edit/${_id}`}>
                        <EditIcon /> Edit
                     </Link> 
                  </Button> 
                  <Button color="secondary" onClick={handleClickOpen}>
                     <DeleteIcon /> Delete
                  </Button> 
               </Paper>
            ) : null}
         </div>
      </ClickAwayListener>
      <div>
         <Dialog
            open={popupOpen}
            onClose={handleClose}
         >
            <h4>Are you sur to delete.?</h4>
            <DialogActions>
               <Button 
                  onClick={() => {
                     setFormLoader(true)
                     deleteArticle(_id, handleClose)
                  }} 
                  color="secondary" 
                  autoFocus
               >
                  Agree
               </Button>
               <Button onClick={handleClose} color="primary">
                  Disagree
               </Button>
            </DialogActions>
            {
               formLoader && <FormLoading />
            }
         </Dialog>
      </div>
      </>
   );
};

export default MoreButton;