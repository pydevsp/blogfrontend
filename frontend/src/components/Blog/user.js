import React , {useEffect , useState} from 'react';
import Common from '../Common.json';
import PopUpModel from './popUpModel'
import {Link} from 'react-router-dom';
import '../auth/auth.css';


const User = () => {
   var Token = localStorage.getItem('jwt')
   if (Token === null) {
      window.location.href = "/login"
   }
   var Name = localStorage.getItem('fName').split(" ")[0]
   var Email = localStorage.getItem('Email')
   var currentUser = localStorage.getItem('UserName')
   var profileUrl = `${Common.API}${ localStorage.getItem('profileUrl')}`
   var defualtProfile = "https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"
   console.log(profileUrl)
   console.log(defualtProfile)
   
   const [modelState, setModelState] = useState(false)
   const onSetModelOn = () => setModelState(true)
   const [callPopUp, setCallPopUp] = useState({
      call:false,
      currentBlogTitle:"",
      currentBlogId:0
  })



   const [state , setState] = useState({
      page : 'user',
      blogs : 0 ,
      likes :0 ,
      comments : 0 ,
      all_blogs  : [] ,
      otherUser_blogs : []
   })

   const normalIcon = "https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_like-512.png"
   const likedIcon = "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-heart-icon-png-image_4183960.jpg"


   const [lastLike , setLastLike] = useState(false)

   useEffect ( () => {
      var lastPage = state.page
      fetch(`${Common.CountAPI}${currentUser}/`).then((res) => res.json()).then((res) =>{
         setState({
            blogs : res.blogs ,
            likes : res.likes ,
            comments : res.comments ,
            all_blogs : res.all_blogs ,
            otherUser_blogs : res.all_otherUser_blogs ,
            page : lastPage,
         })
         console.log(lastPage)
         console.log(res.all_otherUser_blogs)
      })
   },[lastLike] ) 

   const changeState = () => {
      if (state.page == 'user'){
         setState((prevState) => ({...prevState, page:'other/else'}))
      }
      else{
         setState((prevState) => ({...prevState, page:'user'}))
      }
   }

   const likeBlogFunc = (blogId) => {
      fetch(`${Common.LikeBlogAPI}${currentUser}/${blogId}/`).then((res) => res.json()).then((res) =>{
         if (res.status){
            setLastLike({
               blogId : blogId ,
               status : true,
               
            })
         }
         else{
            setLastLike({
               blogId:blogId,
               status:false
            })

         }
      })
   }

   const WriteComment = (blogTitle , blogId) =>{
      setModelState(true)

      setCallPopUp({
         call:true,
         currentBlogTitle:blogTitle,
         currentBlogId:blogId
      })
   }


   const makeDonation = () => {
      alert("Donation Request...")
      fetch(`${Common.SendPaymentRequestAPI}${currentUser}/`).then(res => res.json()).then(res => {
         window.location.href = res.payUrl
      })

  }


   const Logout = () => {
      fetch(`${Common.LogoutAPI}${currentUser}/`).
      then((res) => res.json()).then((res) => {
         if (res.status == "loged out") {
            alert(res.status)
            window.location.href = "/login"
            localStorage.removeItem('jwt')
            localStorage.removeItem('UserName')
            localStorage.removeItem('profileUrl')
         }
         else{
            alert(res.Error)
         }
      })
   }

   return(
      <center>
         <div className = 'box' >
            {
               callPopUp.call?<PopUpModel setModelState = {setModelState} modelState={modelState} blogTitle={callPopUp.currentBlogTitle} blogId={callPopUp.currentBlogId} />:""
            }
            {
               profileUrl !== `${Common.API}` ?
               
               <img width = "60" height = "60" style={{borderRadius:"50%" , float:"left" ,paddingLeft:"20px" , paddingTop:"10px"}} src ={profileUrl}/>  : <img width = "60" height = "60" style={{borderRadius:"50%" , float:"left" ,paddingLeft:"20px" , paddingTop:"10px"}} src ={defualtProfile}/> 
            }
            
            <p className = 'heading'>Hey {Name} 
               <img onClick= {Logout} width = "30" style={{float:'right',paddingRight:"20px"}}  src = "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/38-512.png"/>
            </p>
            <span style = {styles.email}>{Email}</span>
            <div>
               <span style={styles.imgSpan}>
                  <img style={styles.Icon} src = "https://cdn.iconscout.com/icon/free/png-256/comment-2551199-2136583.png" />{state.comments}
               </span>  

               <span style={styles.imgSpan}>
                  <img style={styles.Icon} src = "https://i.pinimg.com/originals/c0/d2/16/c0d21611b7e1ef0bf8486900301822a4.png" />{state.likes}
               </span>

               <span style={styles.imgSpan}>
                  <img style={styles.Icon}src = "https://static.thenounproject.com/png/154887-200.png" />{state.blogs}
               </span>
            </div>
            <div style = {styles.blogDiv}>
               {
                  state.page == 'user'?
                     state.all_blogs.map((blog ,index) => {
                        return(
                           <div style ={{paddingTop:20}}>
                              <p key = {index} style= {styles.blogTitle}>
                                 {blog.titel}
                                 <span style = {styles.blogDate}>
                                    {blog.date}
                                 </span>
                              </p> 
                              <p style = {styles.blogDetail}>
                                 {blog.detail}
                              </p>
                        </div>
                        )
                     })
                     :
                     state.otherUser_blogs.map((blog ,index) => {
                        return(
                           <div style ={{paddingTop:20}}>
                              <p key = {index} style= {styles.blogTitle}>
                                 {blog.titel}
                                 {
                                    blog.likedCurrentUser == true ?
                                       <img onClick = {() => likeBlogFunc(blog.id)} style={styles.likeD} src= {likedIcon}/> :
                                       <img onClick = {() => likeBlogFunc(blog.id)} style={styles.likeD} src= {normalIcon}/>
                                 }
                                 <img style={styles.likeD} onClick={() => WriteComment(`${blog.titel}`,`${blog.id}`)} src = "https://cdn.iconscout.com/icon/free/png-256/comment-2551199-2136583.png" />

                                 <img style={styles.likeD} onClick={makeDonation} src="https://cdn.iconscout.com/icon/premium/png-512-thumb/donation-119-492898.png"/>
                                 <span style = {styles.blogDate}>
                                    {blog.date}
                                 </span>

                              </p> 
                              <p style = {styles.blogDetail}>
                                 {blog.detail}
                              </p>
                        </div>
                        )
                     })
               }
            </div>

         </div>

         <div style={{width:"50%"}}>
            <Link to='/write'><button style={styles.Button}>+</button></Link>
            <button style={styles.ReadButton} onClick={() => changeState()}>
               <img src="https://img.icons8.com/ios/452/reading.png" width="30"/>
            </button>
         </div>
      </center>
   )
}

const styles = {
   email :{
      color : "red",

   },
   Icon :{
      width : 20 ,
      marginTop : 10
   },
   imgSpan :{
      padding : 15 
   },
   Button:{
      fontSize:40,
      borderRadius:"50%",
      width: 50,
      backgroundColor:'coral',
      color:'white',
      float:'right',
      marginRight:10,
      marginTop:"-62px",
      cursor:"pointer",
      zIndex:1
  },
   ReadButton:{
      fontSize:40,
      borderRadius:"50%",
      width: 50,
      backgroundColor:'white',
      borderColor:'white',
      float:'left',
      marginLeft:20,
      marginTop:"-62px",
      cursor:"pointer",
   },
  blogTitle:{
   color:'black',
   fontSize: 25
   

   },
   blogDiv:{
      maxHeight:"330px",
      marginRight:20,
      overflowY:'scroll',
      marginTop:5
   },

   blogDate:{
      float:"right",
      paddingRight: 20,
      fontSize: 16,
      color:'blue',
      fontFamily:'monospace'
   },
   blogDetail:{
      paddingRight : 40,
      paddingLeft : 20,
      // maxHeight : "60px",
      // overflowY:'scroll',
      
   },
   likeD:{
      width : 18 ,
      marginLeft : 10 
   },

}
export default  User;