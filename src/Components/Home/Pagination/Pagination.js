import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContextData } from '../../ContextProvider/ContextProvider';

const Pagination = (props) => {
   const { setFilterData, setPageNumber} = useContextData()
   const {filter, pageNo} = useParams()
   console.log(pageNo)
   useEffect(() => {
      if (pageNo) {
         setFilterData(filter)
         setPageNumber(parseInt(pageNo))
      }
   }, [pageNo])

   const pageNumber = pageNo === undefined ? 1 : parseInt(pageNo)
   const {totalPage, scrollFunc} = props;
   const [customPagination, setCustomPagination] = useState(false)

   const [currentPage, setCurrentPage] = useState(null)
   const okBtn = () => {
      setCustomPagination(false)
      scrollFunc()
   }


   return (
      <div className="paginationDiv">
         <div className="pagination">
            <Button
               onClick={() => scrollFunc()}
               disabled={pageNumber === 1 ? true : false}
               className={pageNumber === 1 && 'btnDisable'}
            >
               <Link to={`/home/${filter}/page=${pageNumber > 1 ? pageNumber-1 : 1}`}>Previous</Link>
            </Button>
            <div className="flex-grow-1 text-center col-8">
               {
                  customPagination ? 
                  <div className="row">
                     <div className="col-4"></div>
                     <input 
                        type="number" 
                        className="col-3" 
                        onChange={(e) => setCurrentPage(parseFloat(e.target.value))} 
                        defaultValue={pageNumber}
                     />
                     <Link to={`/home/${filter}/page=${currentPage && currentPage}`}
                        className="col-1"
                     >
                        <Button 
                           onClick={() => okBtn()} 
                        >OK</Button>
                     </Link>
                     <div className="col-4"></div>
                  </div> : 
                  <p 
                     style={{
                        userSelect:'none', 
                        lineHeight:'1.1', 
                        cursor:'pointer',
                        marginBottom: '0px'
                     }}
                     title='Double To Jump Page'
                     onDoubleClick={() => setCustomPagination(true)}
                  >
                     Page {pageNumber} out of {totalPage}
                     <br/>
                     <small>Double Tab To Jump Page</small>
                  </p>
               }
            </div>
            <Button onClick={() => scrollFunc()}
               disabled={pageNumber === totalPage ? true : false}
               className={pageNumber === totalPage && 'btnDisable'}
            >
               <Link to={`/home/${filter === undefined ? 'latest' : filter}/page=${pageNumber < totalPage ? pageNumber+1 : totalPage}`}>Next</Link>
            </Button>
         </div>
      </div>
   );
};

export default Pagination;