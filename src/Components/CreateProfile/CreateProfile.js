import React, { useEffect, useRef, useState } from 'react';
import { useContextData } from '../ContextProvider/ContextProvider';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import ImageCropper from '../ImageCropper/ImageCropper';
import CreateProfileForm from './CreateProfileForm';
import FormLoading from '../Loading/FormLoading';


const CreateProfile = ({userProfile}) => {
   const {formLoader, profileEdit, userData} = useContextData()

   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const inputRef = useRef()
   const triggerFileSelect = () => inputRef.current.click()
   const [image, setImage] = useState(null)

   const getFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         const reader = new FileReader()
         reader.readAsDataURL(e.target.files[0])
         reader.addEventListener("load", () => {
            setImage(reader.result)
         })
      }
      if (!open) {
         e.preventDefault()
      }
   }

   useEffect(() => {
      if (image) {
         handleClickOpen()
      }
   }, [image])

   const picUrl = "https://res.cloudinary.com/dj7k9b8ps/image/upload/v1619071303/p1uf7vrckivcmiogwwwu.png"

   return (
      <div className="container">
         <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
               <div className="createProfileDiv">
                  {
                     formLoader && <FormLoading />
                  }
                  <Paper elevation={3} className="createProfile">
                     <div className='text-center'>
                        <h3>
                           {
                              profileEdit ? 
                              'Edit Your Profile' : 
                              'Set Your Profile'
                           }
                        </h3>
                     </div>
                     <div className='uploadImgSection'>
                        <img className="uploadedImg" src={userData ? userData.profilePic : picUrl} alt=""/>
                        <div>
                           <input 
                              onChange={getFile} 
                              type="file" 
                              ref={inputRef} 
                              style={{display: 'none'}}
                           />
                           <Button
                              variant='contained'
                              color="primary"
                              className="uploadBtn"
                              onClick={(e) => triggerFileSelect(e)}
                           >
                              {profileEdit ? 'Change Photo' : 'Upload'}
                           </Button>
                        </div>
                        <Dialog
                           open={open}
                           onClose={handleClose}
                           aria-labelledby="alert-dialog-title"
                           aria-describedby="alert-dialog-description"
                           className="imageCropDialog"
                        >
                           {
                              formLoader && <FormLoading />
                           }
                           <DialogTitle id="alert-dialog-title" className="text-center px-5">
                              Please Crop Your Image Before Upload.
                           </DialogTitle>
                           <DialogContent>
                              <ImageCropper 
                                 image={image} 
                                 handleClose={handleClose}
                              />
                           </DialogContent>
                           <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                 Cancel
                              </Button>
                           </DialogActions>
                        </Dialog>
                     </div>
                     <CreateProfileForm userProfile={userProfile} />
                  </Paper>
               </div>
            </div>
            <div className="col-md-3"></div>
         </div>
      </div>
   );
};

export default CreateProfile;