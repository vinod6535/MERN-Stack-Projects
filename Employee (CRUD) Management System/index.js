
// Open and close Modal
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");

// To empty the input box after update the user data for new registration
var registerForm = document.querySelector("#registration-form");
var allInput = registerForm.querySelectorAll("input");

// open Modal
addBtn.onclick = ()=>{
    modal.classList.add("active"); 
}

// Close Modal
closeBtn.onclick=()=>{
    modal.classList.remove("active");
    // var i;
    // for(i=0;i<allInput.length;i++){
    //     allInput[i].value="";
    // }
}

// Start all global Variables

var userData=[];
var idEl= document.querySelector("#id");
var nameEl = document.querySelector("#name");
var l_nameEl = document.querySelector("#l-name");
var emailEl = document.querySelector("#email");
var  officeEl = document.querySelector("#office-code");
var jobTitleEl = document.querySelector("#job-title");
var imgUrl;
var registerBtn = document.getElementById("register-btn");
var updateBtn = document.getElementById("update-btn");
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-pic");

// End of all global Variables

registerBtn.onclick = (e) => {
    e.preventDefault();
    // alert();
    registrationData();
    getDataFromLocal();
    registerForm.reset();
    // So that the page does not refrest after the registration
    closeBtn.click();  

}
// To add the local stroge data to array , so after refresh we can't lost data

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData(){
    userData.push({
        id : idEl.value,
        name : nameEl.value,
        l_name : l_nameEl.value,
        email : emailEl.value,
        office : officeEl.value,
        jobTitle : jobTitleEl.value,
        profilePic : imgUrl == undefined ? "./img/default.avif" : imgUrl
    })
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    Swal.fire('Good job!','Registration Successful','success');
}


// return data on page from local stroge

var tableData = document.querySelector("#table-data");

// ...

// In the getDataFromLocal function, you're adding event listeners for delete buttons.
// You need to wrap the delete button handling code within the forEach loop.
function getDataFromLocal() {
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
        tableData.innerHTML += `
      <tr data-index="${index}">
        <td>${index + 1}</td>
        <td><img src="${data.profilePic}" alt="Employee" width="50" height="50" style="border-radius: 50%;"></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.l_name}</td>
        <td>${data.email}</td>
        <td>${data.office}</td>
        <td>${data.jobTitle}</td>
        <td>
            <button class="edit-btn"><i class="fa fa-eye"></i></button>
            <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
        `;
    });

    // Delete User Data

    // Add event listeners to the delete buttons within the forEach loop
    var allDelBtn = document.querySelectorAll(".del-btn");
    allDelBtn.forEach((delButton, index) => {
        delButton.onclick = () => {
            // Show a confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel',
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // User confirmed the deletion
                    deleteUser(index);
                }
            });
        };
    });
 

    // Update User Data

    var allEdit = document.querySelectorAll(".edit-btn");   

for (let i = 0; i < allEdit.length; i++) {
    allEdit[i].addEventListener("click", function() {
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("TD");
        var index = tr.getAttribute("data-index");
        var imgTag = td[1].getElementsByTagName("IMG");
        var profilePic = imgTag[0].src;
        // alert(profile_pic);
        var id = td[2].innerHTML;
        var name = td[3].innerHTML;
        var l_name = td[4].innerHTML;
        var email = td[5].innerHTML;
        var officeCode = td[6].innerHTML;
        var jobTitle = td[7].innerHTML;

        addBtn.click();

        registerBtn.disabled= true;
        updateBtn.disabled = false;

            idEl.value= id;
            nameEl.value = name;
            l_nameEl.value = l_name;
            emailEl.value = email;
            officeEl.value= officeCode;
            jobTitleEl.value = jobTitle;
            profile_pic.src = profilePic;
            updateBtn.onclick=function(e){
                userData[index]={
                    id : idEl.value,
                    name : nameEl.value,
                    l_name : l_nameEl.value,
                    email : emailEl.value,
                    office : officeEl.value,
                    jobTitle : jobTitleEl.value,
                    profilePic : uploadPic.value == "" ? profile_pic.src : imgUrl
                }
                localStorage.setItem("userData",JSON.stringify(userData));
            }
    });
}

}

function deleteUser(index) {
    // Remove the corresponding user data
    userData.splice(index, 1);
    // Update the localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    // Refresh the displayed data
    getDataFromLocal();
    // Display a success message
    Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
}

getDataFromLocal();

// Image Processing


uploadPic.onchange = ()=>{

        if(uploadPic.files[0].size < 1000000){
            var fReader = new FileReader();
            fReader.onload=function(e){
                imgUrl = e.target.result;
                profile_pic.src= imgUrl;
            } 
            fReader.readAsDataURL(uploadPic.files[0]);
        }
        else{
            alert("File size is too long");
        }
}

   