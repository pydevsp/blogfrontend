import React from 'react'

const PayCheck = (props) => {
   if(props.location.search.indexOf("Credit") > -1){
      return (
         <div>
            <h2 style={{color:"white"}}>You Paid Successfully...</h2>
            <button onClick={() => {
               window.location.href = "/user"
            }}>Home</button>
         </div>
   )
   }else {
      return (
         <div>
            <h2 style={{color:"white"}}>Incorrect Payment....123</h2>
            <button onClick={() => {
               window.location.href = "/user"
            }}>Home</button>
         </div>
   )
   }

}

export default PayCheck