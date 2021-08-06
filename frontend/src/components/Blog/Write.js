import React from 'react' ;
import '../auth/auth.css';
import Common from '../Common.json';
import {Link} from 'react-router-dom'


const Write = () => {
   var Name = localStorage.getItem('fName').split(" ")[0]
   var username = localStorage.getItem('UserName')

   const onSubmitForm = (event) =>{
      event.preventDefault()
      var  WriteBlogAPI = Common.WriteBlogAPI;
      var title = document.getElementById("title");
      var blog = document.getElementById("blog");
      var formData =new FormData();
 
      formData.append('title', title.value)
      formData.append('blog', blog.value)
      formData.append('user' , username)

      
      fetch(WriteBlogAPI , {
         method : 'POST',
         body  : formData
      }).then((res) => res.json()).then((res) => {
         if (res.Status == "Created") {
            window.location.href = Common.UserHomePageURL
         }
         else{
            alert(res.Error)
         }
      })

   }
   return(
      <center>
         <div className = 'box'>
            <p className = 'heading'>Hey {Name}! write your new blog </p>
            <form onSubmit = {onSubmitForm}>

               <div className = 'form-group'>
                  <label>Title : </label><br/>
                  <input id = "title" type = "text" required placeholder="Blog title name" className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <textarea id = "blog"  required placeholder="Start from here..." className = 'form-control' style = {{height:200 , width:400 , borderRadius:10}}/>

               </div>

               <div className = 'form-group'>
                  <input type = "submit"   className = 'submitButton' value='create'/>
               </div>
            </form>

         </div>
         <div style={{width:"50%"}}>
            <Link to='/user'><button style={styles.Button}>back</button></Link>
         </div>
        
      </center>
   );
}



const styles = {
   Button:{
      fontSize:17,
      borderRadius:"50%",
      width: 50,
      backgroundColor:'coral',
      color:'white',
      float:'right',
      marginRight:10,
      marginTop:"-62px",
      cursor:"pointer",
      zIndex:1
  }
}

export default Write;
