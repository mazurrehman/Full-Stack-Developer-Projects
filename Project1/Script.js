let userName=document.getElementById("username");
let email=document.getElementById("email");
let pass=document.getElementById("password");
let passcon=document.getElementById("confirmpassword");
let form=document.querySelector("form");

function validateInput(){ 
    // Check for user name
    if (userName.value.trim()==="") {
        onError(userName,"User name can not be empty");
    } else {
        onSuccess(userName);
    }
    // check for email
    if (email.value.trim()==="") {
        onError(email,"Email can not be empty");  
    } else {
        if (!isValidEmail(email.value.trim())) {
            onError(email,"Email is not valid");
        } else {
            onSuccess(email);
        }
    }
    // check for password
    if (pass.value.trim()==="") {
        onError(pass,"Password can not be empty");  
    } else {
        onSuccess(pass);
    }
    // check for confirm password
    if (passcon.value.trim()==="") {
        onError(passcon,"Confirm Password can not be empty");  
    } else {
        if (pass.value.trim()!==passcon.value.trim()) {
            onError(passcon,"Password not matched");
        } else {
            onSuccess(passcon);   
        }
        
    }
}

document.querySelector("button")
.addEventListener("click",(event)=>{
    event.preventDefault();
    validateInput();
});

function onSuccess(input){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="hidden";
    parent.classList.remove("error");
    parent.classList.add("success");
}

function onError(input,message){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="visible";
    messageEle.innerText=message;
    parent.classList.remove("success");
    parent.classList.add("error");
}

function isValidEmail(email){
   return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}