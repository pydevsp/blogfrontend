import React from 'react' ;
import './auth.css';
import Common from '../Common.json';
import {Link} from 'react-router-dom';


const Login = () => {
   const onSubmitForm = (event) =>{
      var  loginAPI = Common.LoginAPI;
      var username = document.getElementById("username");
      var password = document.getElementById("password");
      var formData =new FormData();
 
      formData.append('username', username.value)
      formData.append('pass', password.value)


      fetch(loginAPI , {
         method : 'POST',
         body  : formData
      }).then((res) => res.json()).then((res) => {
         if (res.Status == "LoggedIn") {
            localStorage.setItem('jwt' , res.Token)
            localStorage.setItem('UserName' , res.Username)
            localStorage.setItem('fName' , res.Name)
            localStorage.setItem('Email' , res.Email)
            localStorage.setItem('profileUrl' , res.profileUrl)
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
            <p className = 'heading'>Login your Account</p>
            <form>
             
               <div className = 'form-group'>
                  <label>UserName : </label><br/>
                  <input id = "username" type = "text" required placeholder="choose username" className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <label>Password : </label><br/>
                  <input id = "password" type = "password" required placeholder="choose password" className = 'form-control'/>

               </div>

               <div className = 'form-group'>
                  <input type = "button" onClick ={onSubmitForm} className = 'submitButton' value='login'/>
               </div>
            </form>
            <Link to = '/'><p>New User : Register</p></Link>
         </div>
        
      </center>
   );
}


export default Login;
