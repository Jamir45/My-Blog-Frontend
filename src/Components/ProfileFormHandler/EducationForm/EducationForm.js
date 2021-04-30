import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContextData } from '../../ContextProvider/ContextProvider';

const EducationForm = (props) => {
   const {user, setUser, userData, setUserData} = useContextData()

   // const { register, handleSubmit, errors, onSubmit } = props;   
   const { submit, setSubmit } = props;   
   const { register, handleSubmit, errors } = useForm();   
   const [formData, setFormData] = useState() 
   const onSubmit = data => { 
      console.log(data)
      setFormData(data)
   }  
   useEffect(() => {
      if (submit) {
         handleSubmit(onSubmit)
      }
   }, [submit])
   
   useEffect(() => {
      if (formData) {
         setSubmit(false)
      }
   }, [formData])
   
   return (
      <div>
         <form className='bioForm' onSubmit={handleSubmit(onSubmit)}>
            <h6>Education</h6>
            <div className="form-group">
               <label htmlFor="country">Degree</label>
               <input 
                  name="degree"
                  className='form-control'
                  placeholder="Degree (Max Length 50 Characters)"
                  ref={register()}
               />
            </div>

            <div className="form-group">
               <label htmlFor="country">Institute</label>
               <input 
                  name="institute"
                  className='form-control'
                  placeholder="Institute (Max Length 100 Characters)"
                  ref={register()}
               />
            </div>
            
            <input type="submit" />
         </form>
      </div>
   );
};

export default EducationForm;