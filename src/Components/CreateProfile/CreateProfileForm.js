import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import countryData from '../../Files/countries+states.json'
import LanguageIcon from '@material-ui/icons/Language';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Button } from '@material-ui/core';
import { useContextData } from '../ContextProvider/ContextProvider';
import ProfileHandler from '../ContextProvider/Handler/ProfileHandler';
import { getCookie } from '../SignupAndSignin/Signin/SigninHelper';

const CreateProfileForm = () => {
   const {setFormLoader, userData} = useContextData()
   const {postProfileData} = ProfileHandler()
   // const token = getCookie('myBlogToken')
   // console.log(token)

   const { register, handleSubmit, errors, watch } = useForm();
   const {bio, degree, institute, position, organization} = watch()
   
   const onSubmit = data => { 
      console.log(data)
      postProfileData(data)
      setFormLoader(true)
   }  
   // const [bioLength, setBioLength] = useState()
   // const [formData, setFormData] = useState()
   // const [formData, setFormData] = useState()
   // const [formData, setFormData] = useState()
   // const [formData, setFormData] = useState()

   return (
      <div>
         <form className='createProfileForm' onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-group">
               <label htmlFor="country">Country Name</label>
               <input 
                  className='form-control'
                  list="browsers"
                  id="country"
                  placeholder="Country Name"
                  name="country"
                  ref={register({ required: true })}
               />
               <datalist id="browsers">
                  {
                     countryData && countryData.map(country => {
                        return <option value={country.name} />
                     })
                  }
               </datalist>
               {
                  errors.country && 
                  <span className="Error">
                     Please Provide Your Country Name.
                  </span>
               }
            </div>

            <div className="form-group">
               <label htmlFor="country">Your Name</label>
               <input 
                  name="name"
                  className='form-control'
                  placeholder="Your Name"
                  defaultValue={userData && userData.username}
                  ref={register({ required: true })}
               />
               {
                  errors.name && 
                  <span className="Error">
                     Name is required
                  </span>
               }
            </div>

            <div className="form-group">
               <label htmlFor="bio">Add Your Short Bio</label>
               <textarea 
                  name="bio" 
                  id="bio"
                  rows="5"
                  className='form-control'
                  ref={register({ required: true })}
                  placeholder="Bio Length Will Be Maximum 250 Character." 
               />
               {
                  errors.bio && 
                  <span className="Error">
                     Please Provide Your Short BIo
                  </span>
               }
               {
                  bio && bio.length > 250 && 
                  <span className="Error">
                     Your Bio Must Be Below 250 characters
                  </span>
               }
            </div>

            {/* Social Links Details Section */}
            <h5>Your Social Links</h5>
            <div className="socialLinks">
               <LanguageIcon className='socialIcons' />
               <input 
                  type="text"
                  name="website"
                  className="form-control" 
                  placeholder="Website Profile Link (Optional)"
                  ref={register()}
               />
            </div>
            <div className="socialLinks">
               <FacebookIcon className='socialIcons' />
               <input 
                  type="text"
                  name="facebook"
                  className="form-control" 
                  placeholder="Facebook Profile Link (Optional)"
                  ref={register()}
               />
            </div>
            <div className="socialLinks">
               <TwitterIcon className='socialIcons' />
               <input 
                  type="text"
                  name="twitter"
                  className="form-control" 
                  placeholder="Twitter Profile Link (Optional)"
                  ref={register()}
               />
            </div>
            <div className="socialLinks">
               <LinkedInIcon className='socialIcons' />
               <input 
                  type="text"
                  name="linkedin"
                  className="form-control" 
                  placeholder="Linkedin Profile Link (Optional)"
                  ref={register()}
               />
            </div>

            {/* Education Details Section */}
            <h5 className='workAndEducation'>Your Education Details</h5>
            <div className="form-group">
               <label>Degree</label>
               <input 
                  name="degree"
                  className='form-control'
                  placeholder="Degree (Max Length 50 Characters)"
                  ref={register()}
               />
               {
                  degree && degree.length > 50 && 
                  <span className="Error">
                     Degree Length Must Be Below 50 characters
                  </span>
               }
            </div>

            <div className="form-group">
               <label>Institute</label>
               <input 
                  name="institute"
                  className='form-control'
                  placeholder="Institute (Max Length 100 Characters)"
                  ref={register()}
               />
               {
                  institute && institute.length > 80 && 
                  <span className="Error">
                     Institute Length Must Be Below 80 characters
                  </span>
               }
            </div>

            {/* Work Details Section */}
            <h5 className='workAndEducation'>Your Work Details</h5>
            <div className="form-group">
               <label>Position</label>
               <input 
                  name="position"
                  className='form-control'
                  placeholder="Position (Max Length 50 Characters)"
                  ref={register()}
               />
               {
                  position && position.length > 50 && 
                  <span className="Error">
                     Position Name Must Be Below 50 characters
                  </span>
               }
            </div>

            <div className="form-group">
               <label>Organization</label>
               <input 
                  name="organization"
                  className='form-control'
                  placeholder="Organization (Max Length 100 Characters)"
                  ref={register()}
               />
               {
                  organization && organization.length > 80 && 
                  <span className="Error">
                     Organization Name Must Be Below 80 characters
                  </span>
               }
            </div>
            
            <div className="saveBtnDiv">
               <Button
                  type="submit"
                  variant='contained'
               >
                  Save Profile
               </Button>
            </div>
         </form>
      </div>
   );
};

export default CreateProfileForm;