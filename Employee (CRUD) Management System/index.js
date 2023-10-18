// Add employee btn 
var addBtn = document.getElementById("add-emp");
var modal = document.querySelector(".modal");
var closeModalBtn = document.querySelector(".close-icon");
var registerbtn = document.querySelector("#register-btn");


addBtn.onclick = function(){
    modal.classList.add("active");
} 

closeModalBtn.onclick = function(){
    modal.classList.remove("active");
} 

var imgUrl;

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


registerForm.onsubmit = (e) => {
    registerData();
    registerForm.reset();
    getDataFromLocal();
    // To prevent the page reload after registration (Default behavior)
    e.preventDefault();
    closeModalBtn.click();
}


function registerData(){
    userData.push({
        id : id.value,
        name : f_name.value, 
        l_name  : l_name.value,
        email : email.value,
        of_code : office_code.value,
        job_title :job_title.value,
        profile_pic : imgUrl == undefined ? "./img/default.avif" : imgUrl
    })
    var userStringData = JSON.stringify(userData);
    localStorage.setItem("userStringDataKey",userStringData);
    Swal.fire( 'Good job!','Registration Successfull','success')
}
// To store the data in the array as a object and the data remains save after refresh the page
if(localStorage.getItem("userStringDataKey")!=null){
    userData = JSON.parse(localStorage.getItem("userStringDataKey"));
}

// Starting return data on page from local stroge

var tableData = document.querySelector("#table-data");
 

// ...

const getDataFromLocal = () => {
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.setAttribute("index", index);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${data.profile_pic}" alt="Employee" width="50" height="50" style="border-radius: 50%;"></td>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.l_name}</td>
            <td>${data.email}</td>
            <td>${data.of_code}</td>
            <td>${data.job_title}</td>
            <td>
                <button><i class="fa fa-eye"></i></button>
                <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
            </td>
        `;

        const delButton = row.querySelector(".del-btn");
        delButton.onclick = () => {
            // Get the index from the row's attribute
            const dataIndex = row.getAttribute("index");

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
                    deleteUser(dataIndex);
                }
            });
        };

        tableData.appendChild(row);
    });

    // ...

    function deleteUser(index) {
        // Remove the corresponding user data
        userData.splice(index, 1);
        // Update the localStorage
        localStorage.setItem("userStringDataKey", JSON.stringify(userData));
        // Refresh the displayed data
        getDataFromLocal();
        // Display a success message
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
}


// ...

getDataFromLocal();

// Image Processing

var profilePic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-pic");

uploadPic.onchange = ()=>{

        if(uploadPic.files[0].size < 1000000){
            var fReader = new FileReader();
            fReader.onload=function(e){
                imgUrl = e.target.result;
                profilePic.src= imgUrl;
            }
            fReader.readAsDataURL(uploadPic.files[0]);
        }
        else{
            alert("File size is too long");
        }
}

   