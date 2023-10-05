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
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*(){}[]|:;"<,>.?/';

// Default Values
let password = "";
let passwordLength = 10;
let checkCount = 0;

setIndicator("#ccc");

// Set Password Length
handleSlider();

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
// Here the fisrt part is width and second is height
  inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
}

inputSlider.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})



function setIndicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow = `0px 0px 12px 7px ${color}`;
}

// Generating Random Password
// Random Function
function getRndInteger(min,max){
     return Math.floor( Math.random()*(max-min))+min;
}

// Other Functions

function generateRandomNumber(){
    // console.log("Add Random Number");
    return getRndInteger(0,9);
}

function generateLowerCase(){
    // console.log("Add Lower case");

    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    // console.log("Add Upper case");

    return String.fromCharCode(getRndInteger(65,91));
}
 
function generateSymbol(){
    // console.log("Add Symbol");

    const randNumber = getRndInteger(0,symbols.length);
    return symbols.charAt(randNumber);
}

// Adjust Color According to the strength of the password 

function calcStrength(){

    let hasUpper=  false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.Checked) hasUpper = true;
    if(lowercaseCheck.Checked) hasLower = true;
    if(numberCheck.Checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >=8) setIndicator("#0f0");
    else if((hasLower && hasUpper) && (hasNumber && hasSymbol) && passwordLength >=6) setIndicator("#ff0");
    else{
    setIndicator("#f00")
}
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


 function sufflePassword(array){
    // Fisher Yates Methods (It is a technique to shuffle the elements in an array)
    for(let i =array.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=> (str+=el));
    return str;
 }

function handelCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
        // Special Case
        if(passwordLength < checkCount){
            password=checkCount;
            handleSlider();
        }
    })
}


allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handelCheckBoxChange);
})



copyBtn.addEventListener("click", ()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener("click",()=>{
    if(checkCount<=0) return;

    if(passwordLength < checkCount){   /////////////////////
        passwordLength= checkCount;
        handleSlider();
    }

    // Journey to find the new password

    // Remove old Password (if Exists)

    password="";
    // passwordDisplay.innerText=password;   // 213

    // let's put the stuff mentioned in the checkboxes
  
    let funcArr = [];

        if(uppercaseCheck.checked)
            funcArr.push(generateUpperCase);
        if(lowercaseCheck.checked)
            funcArr.push(generateLowerCase);
        if(numberCheck.checked)
            funcArr.push(generateRandomNumber);
        if(symbolCheck.checked)
            funcArr.push(generateSymbol);

        for( let i=0 ;i<funcArr.length;i++){
            password+=funcArr[i]();     // 221 check () and above lines
        }

        for(let i=0;i<passwordLength-funcArr.length;i++){
                let randIndex = getRndInteger(0,funcArr.length);
                password += funcArr[randIndex]();
        }

        // shuffle the password
        password = sufflePassword(Array.from(password));
       
        
        // Display the password
        passwordDisplay.value = password;
        
        // Check the strength of the password
        calcStrength();       
    
})

