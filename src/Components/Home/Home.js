import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ImageCrop from './ImageCrop/ImageCrop';

const Home = () => {
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   // const [formData, setFormData] = useState()
   // console.log(formData)

   const inputRef = useRef()
   const triggerFileSelect = () => inputRef.current.click()
   const [image, setImage] = useState(null)
   const [croppedImg, setCroppedImg] = useState(null)

   const getFile = (e) => {
      console.log(e)
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

   return (
      <div className='container'>
         <img src={croppedImg} className='img-fluid' style={{width: '400px'}} alt=""/>
         <div>
            <h1>Upload Multiple Files</h1>
            <input 
               onChange={getFile} 
               type="file" 
               ref={inputRef} 
               style={{display: 'none'}}
            />
            <Button
               variant='contained'
               color="primary"
               onClick={(e) => triggerFileSelect(e)}
            >
               Upload
            </Button>
         </div>

         <div>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title" className="text-center px-5">
                  Please Crop Your Image Before Upload.
               </DialogTitle>
               <DialogContent>
                  <ImageCrop image={image} setCroppedImg={setCroppedImg} />
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} color="primary">
                     Disagree
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      </div>
   );
};

export default Home;