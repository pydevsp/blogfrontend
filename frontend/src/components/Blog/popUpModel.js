import React, {useState} from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "./modelCss.css"
import Common from "../Common";
import Write from "./Write";



const PopUpModel = ({setModelState,modelState, blogTitle, blogId }) => {
   const onSetModelOff = () => setModelState(false)
   var Name = localStorage.getItem("fName").split(" ")[0]
   var currentUser = localStorage.getItem("UserName")

   const WriteBlog = () => {
      var comment = document.getElementById("comment").value;
      var formData = new FormData()
      formData.append("commentss", comment)


      fetch(`${Common.CommentBlogAPI}${currentUser}/${blogId}/`, {
           method:"POST",
           body:formData
      })
         onSetModelOff(false)

   }


    return (
        <div>
         <Modal
        open={modelState}
        onClose={onSetModelOff}
        center
        classNames={{
          overlayAnimationIn: 'customEnterOverlayAnimation',
          overlayAnimationOut: 'customLeaveOverlayAnimation',
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
            overlay: 'customOverlay',
          modal: 'customModal',
        }}
        animationDuration={800}
      >
                <h2>Hey {Name}! Want to Comment !</h2>
                <h4>{blogTitle}</h4>
                <textarea type="text" id = "comment" style={{width:400}}></textarea><br/>
                <button onClick={WriteBlog} >Comment</button>
      </Modal>
        </div>
    )
}

export default PopUpModel