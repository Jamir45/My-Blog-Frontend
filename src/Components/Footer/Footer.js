import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpIcon from '@material-ui/icons/Help';

const Footer = () => {
   return (
      <div className='footerSection'>
         <div className='container'>
            <div className="row">
               <div className="col-md-3">
                  <h4>MY <span>BLOG</span></h4>
                  <p>Multi Author Blogging</p>
               </div>
               <div className="col-md-3">
                  <p>About Us</p>
                  <ul>
                     <li>Terms & Condition</li>
                     <li>Feedback</li>
                     <li>Community</li>
                  </ul>
               </div>
               <div className="col-md-3">
                  <p>Follow Us</p>
                  <ul>
                     <li>
                        <a href='https://www.facebook.com' target="_blank"> 
                           <FacebookIcon/> FaceBook 
                        </a>
                     </li>
                     <li>
                        <a href='https://www.twitter.com' target="_blank"> 
                           <TwitterIcon/> Twitter 
                        </a>
                     </li>
                     <li>
                        <a href='https://www.linkedin.com' target="_blank"> 
                           <LinkedInIcon/> Linkedin 
                        </a>
                     </li>
                  </ul>
               </div>
               <div className="col-md-3">
                  <p>Contact Us</p>
                  <ul>
                     <li><MailIcon /> myblog@gmail.com</li>
                     <li><PhoneIcon /> +1-202-555-0107</li>
                     <li><HelpIcon /> Help Center</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;