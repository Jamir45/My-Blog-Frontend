import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import countryData from '../../../Files/countries+states.json'
import LanguageIcon from '@material-ui/icons/Language';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { useContextData } from '../../ContextProvider/ContextProvider';
import { Button } from '@material-ui/core';

const BioForm = (props) => {
   const {user, setUser, userData, setUserData} = useContextData()

   // const { register, handleSubmit, errors, onSubmit } = props; 
   const { register, handleSubmit, errors } = useForm();
   const [formData, setFormData] = useState() 
   const onSubmit = data => { 
      setFormData(data)
   }  

   return (
      <div>
         <form className='bioForm' onSubmit={handleSubmit(onSubmit)}>
            
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
                     Country Name is required
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
               <label htmlFor="bio">Your Bio</label>
               <textarea 
                  name="bio" 
                  id="bio"
                  rows="5"
                  className='form-control'
                  ref={register({ required: true })}
                  placeholder="Bio Length Will Be Maximum 200 Character." 
               />
               {
                  errors.bio && 
                  <span className="Error">
                     Bio is required
                  </span>
               }
            </div>

            <h6 className='mt-3'>Your Social Links</h6>
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
            
            <input type="submit" />
         </form>
      </div>
   );
};

export default BioForm;