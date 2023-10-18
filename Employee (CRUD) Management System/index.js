// Add employee btn 
var addBtn = document.getElementById("add-emp");
var modal = document.querySelector(".modal");
var closeModalBtn = document.querySelector(".close-icon");
var registerbtn = document.querySelector("#register_btn");


addBtn.onclick = function(){
    console.log("Under")
    modal.classList.add("active");
} 

closeModalBtn.onclick = function(){
    console.log("Under close")
    modal.classList.remove("active");
} 

// Start of all Global variable
var id = document.querySelector("#id");
var f_name = document.querySelector("#name");
var l_name = document.querySelector("#l-name");
var email= document.querySelector("#email");
var office_code = document.querySelector("#office-code");
var job_title = document.querySelector("#job-title"); 
var userData = [];
var registerForm = document.querySelector("#registration-form");
// End of all Global variables

registerbtn.onclick = (e)=>{
    registerData();
    registerForm.requestFullscreen('');
    // To prevent the page reload after registration (Defalut behaviour)
    e.preventDefault();
    closeModalBtn.click();
}

function registerData(){
    userData.push({
        id : id.value,
        name : f_name.value,  /// 
        l_name  : l_name.value,
        email : email.value,
        of_code : office_code.value,
        job_title :job_title.value
    })
    var userStringData = JSON.stringify(userData);
    localStorage.setItem("userStringDataKey",userStringData);
}
