const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '~`!@#$%^&*(){}[]|:;"<,>.?/';

// Default Values
let password = "";
let passwordLength = 10;
let checkCount = 1;

// Set Password Length
handelSlider();

function handelSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}


function setIndicator(color){
    indicator.style.backgroundColor= color;
    // Shadow
}

// Generating Random Password
// Random Function
function getRndInteger(min,max){
     return Math.floor( Math.random()*(max-min))+min;
}

// Other Functions

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
 
function generateSymbol(){
    const randNumber = getRndInteger(0,symbols.length);
    return symbols.charAt(randNumber);
}

// Adjust Color According to the strength of the password 

function calcStrength(){

    let hasUpper=false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.Checked) hasUpper = true;
    if(lowercaseCheck.Checked) hasLower = true;
    if(numberCheck.Checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >=8) setIndicator("#0f0")
    else if((hasLower && hasUpper) && (hasNumber && hasSymbol) && passwordLength >=6) setIndicator("#ff0")
    else{
    setIndicator("#f00")}

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    // to make copy span visible
    copyMsg.classList.add("active")  //-------------

    // to remove the copy message after 2 sec
    setTimeout (() => {
        copyMsg.classList.remove("active");
    },2000)
}




inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handelSlider();
})

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
})

