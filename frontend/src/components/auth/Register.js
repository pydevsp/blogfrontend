
import React from 'react' ;
import './auth.css';
import Common from '../Common.json';
import {Link} from 'react-router-dom';


// export default function Register(){  ----- type 1 function component
const Register = () =>{                 // --- type 2    

   const onSubmitForm = (event) =>{
      var  registerAPI = Common.RegisterAPI;
      var name = document.getElementById("name");
      var username = document.getElementById("username");
      var email = document.getElementById("email");
      var password = document.getElementById("password");
      var profile = document.getElementById("profile");
      var formData =new FormData();
      formData.append('name', name.value)
      formData.append('username', username.value)
      formData.append('email', email.value)
      formData.append('pass', password.value)
      formData.append('profile', profile.files[0])

      fetch(registerAPI , {
         method : 'POST',
         body  : formData
      }).then((res) => res.json()).then((res) => {
         if (res.error) {
            alert(res.error)
            username.style.backgroundColor = '#ff0000'
            username.focus()

         }
         else{
            window.location.href = Common.RegisterPageURL
            alert("registration successful")
         }
      })
   }

   const onChangeImg = (event) => {
      var imgUrl = URL.createObjectURL(event.target.files[0])
      document.getElementById("imShow").src = imgUrl

   }

   return(
      <center>
         <div className = 'box'>
            <p className = 'heading'>Rregister your Account</p>
            <form>
               
               <div className = 'form-group'>
                  <label htmlFor = "profile"><img id="imShow" src = "https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"  width = "60" height = "60" style = {{borderRadius : "50%" , cursor : "pointer"}}/></label><br/>
                  <input accept = "Image/*" hidden id = "profile" onChange = {onChangeImg} type = "file" required  className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <label>Name : </label><br/>
                  <input id = "name" type = "text" required placeholder="enter your name" className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <label>UserName : </label><br/>
                  <input id = "username" type = "text" required placeholder="choose username" className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <label>Email : </label><br/>
                  <input id = "email" type = "email" required placeholder="enter your email id" className = 'form-control'/>
               </div>

               <div className = 'form-group'>
                  <label>Password : </label><br/>
                  <input id = "password" type = "password" required placeholder="choose password" className = 'form-control'/>

               </div>

               <div className = 'form-group'>
                  <input type = "button" onClick ={onSubmitForm} className = 'submitButton' value='register'/>
               </div>
            </form>
            <Link to = '/login'><p>Already Registered : logIn</p></Link>
         </div>
      
      </center>
   );
}

export default  Register;

