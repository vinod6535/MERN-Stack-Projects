// function closeModal(){
//     var ans = document.getElementsByClassName("modal");
//     ans.style.display="none";
// }

const overlay = document.querySelector(".overlay");
function closeModal() {
    var modals = document.getElementsByClassName("modal");

    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
 

    overlay.classList.remove("overlayActive");
}

function openModal() {
    var modals = document.getElementsByClassName("modal");

    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "block";
    }
    overlay.classList.add("overlayActive");
}


