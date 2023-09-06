
var num = 0;

let box = document.getElementsByTagName("h2")[0];

function numDisplay(){
    box.textContent = num;
}

numDisplay();

function theSub(){
    num = num-1;
    numDisplay();
}

function theAdd(){
    num = num+1;
    numDisplay();
}