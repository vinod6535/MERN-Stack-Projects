const overlay = document.querySelector(".overlay");
const modals = document.querySelectorAll(".modal");

function closeModal() {
    modals.forEach((modal) => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.visibility = "hidden";
        }, 500); // Delay the visibility change
    });
    overlay.classList.remove("overlayActive");
}

function openModal() {
    modals.forEach((modal) => {
        modal.style.opacity = "1";
        modal.style.visibility = "visible";
    });
    overlay.classList.add("overlayActive");
}
