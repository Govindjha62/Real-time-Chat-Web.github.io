const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault(); //preventing form from submitting
}

sendBtn.onclick = ()=>{
     //let's stat ajax
     let xhr = new XMLHttpRequest(); //creating XML object
     xhr.open("POST", "php/insert-chat.php",true);
     xhr.onload = ()=>{
         if(xhr.readyState === XMLHttpRequest.DONE){
             if(xhr.status === 200){
                inputField.value = "";//once message inserted into databse then leave blank the input field
                scrollToBottom();
                
 
             }
         }
     }
     // We have to send the form data through ajax to php
     let formData = new FormData(form); //creating new formdata onject
     xhr.send(formData);//sending the form data to php
 
}
chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active");

}
chatBox.onmouseenter = ()=>{
    chatBox.classList.remove("active");

}
setInterval(()=>{
    //let's stat ajax
    let xhr = new XMLHttpRequest(); //creating XML object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                chatBox.innerHTML = data;
               if(!chatBox.classList.contains("active"))// fi active ckass not contains in chatbox the scroll to bottom
               {
                scrollToBottom();
               }
            }
        }
    }
    //we have to send the form data through ajax to php
    let formData = new FormData(form); //creating new formdata onject
    xhr.send(formData);//sending the form data to php
    
},500);//this function will run frequently after 500ms


function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}