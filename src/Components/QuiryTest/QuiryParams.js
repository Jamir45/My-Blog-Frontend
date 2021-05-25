import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import QuiryResult from "./QuiryResult";


function useQuery() {
   return new URLSearchParams(useLocation().search);
 }
 
const QuiryParams = () => {
   let query = useQuery();

   return (
      <div>
         <ul>
            <li>
               <Link to="/home/name=netflix">Netflix</Link>
            </li>
            <li>
               <Link to="/home/name=zillow-group">Zillow Group</Link>
            </li>
            <li>
               <Link to="/home/name=yahoo">Yahoo</Link>
            </li>
            <li>
               <Link to="/home/name=modus-create">Modus Create</Link>
            </li>
         </ul>

         {/* <QuiryResult name={query.get("name")} /> */}
      </div>
   );
};

export default QuiryParams;