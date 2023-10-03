// Code for preventing dot to be entered in input field for bankloan (specific coding)
document.getElementById("bankloan").addEventListener("change", function(event){
    preventDot();
});

function preventDot() {
}
    var inputBox = document.getElementById("bankloan");

    var invalidChars = [
    ".",
];

inputBox.addEventListener("keydown", function(e) {
    if (invalidChars.includes(e.key)) {
    e.preventDefault();
    }
});


let fieldLength = document.getElementById("interest-rate");
fieldLength.addEventListener("keyup" , shortenLength);
function shortenLength() {
    const copyLength = fieldLength.value;
    if (copyLength.includes(".")) {
    fieldLength.value = fieldLength.value.substr(0, 5);
    }else{
    fieldLength.value = fieldLength.value.substr(0, 2);
  }
}

/*The 2 blocks below is code for masking digits and dot in interest-rate field and limiting input to be lower than 100*/
var RegExp = new RegExp(/^\d*\.?\d*$/);
var val = document.getElementById("interest-rate").value;
function valid(elem) {
  if (RegExp.test(elem.value)) {
      val = elem.value;
      }else{
      elem.value = val;
      }
}

var valuelimit = document.getElementById("interest-rate").value;
function validity(elem) {
  if (valuelimit >100) {
      val = elem.value; 
      }else{
      elem.value = val;
      }
}

var val = document.getElementById("interest-rate").value;
if(document.getElementById("interest-rate") !=null){
document.getElementById("interest-rate").onkeypress = function(event){             
  var charCode = document.getElementById("interest-rate").value.toString();
      if(charCode.includes(".")){
    	var numb =  charCode.split(".")[1];
      if(numb!=null && numb.length>1)
      {alert("Only 2 decimal places allowed");
      return false;
      }
    }
  };
}

function quantity(amount){
    var select = document.getElementById('payoff-years');
    for (var i = 0; i < amount; i++){
    select.options[select.options.length] = new Option(i+1, i);
    }
    document.getElementById('calculate').style.color = "grey";
    document.getElementById('email-result').style.color = "grey";
    }
quantity(50);


// Start of calculation and result output block
function calculate() {  
    let loan = document.getElementById('bankloan').value;
    let interestrate = document.getElementById('interest-rate').value;
    let payofftime = document.getElementById('payoff-years').selectedIndex +1;
    let amortization = 0;

    interestrate = interestrate / 100;
    let initialloan = loan;
    let totalloan = loan * interestrate;
    let monthlycost = (loan * interestrate) / 12;
    let counter = 0;
    let restmonth = 0;
    var resttime = 0;
    var resttimemonth = 0;
    payofftime = payofftime * 12;
    var resttimeplus = resttime + payofftime;
    var interestcosttime = 0;
    interestcosttime = loan / payofftime;
    var interestreal = (interestrate * initialloan) / 12;
    var interestcopy = 0;
    var monthlycostfinal = 0;
    var month = 0;
    let monthlycostfix = Math.ceil(initialloan / payofftime);
    let totalcost = 0;
    let loanextra = 0;
    let monthtotal = 0;
    let firstmonth = Math.ceil((loan * interestrate)/12);
    firstmonth = firstmonth + (loan/payofftime);
    let payofftimereal = payofftime -1;
    let payofflevel = (initialloan / payofftimereal);
    payofflevel = payofflevel * 100;
  
    document.getElementById('output').style.color = "white";

    for (let i = 0; i < payofftime; i++) {
    counter = counter + 1;
    totalloan = loan;
    monthlycost = (loan * interestrate) / 12;
    month = monthlycost;
    loan = loan - monthlycostfix;
    resttimemonth = (loan / amortization);
    monthlycostfinal = monthlycost + month;
    loanextra = (loan * interestrate) /12;
    interestcopy = interestcopy + loanextra;
    }

    if (initialloan >= 10000 && monthlycostfix >= 100) {
    monthlycost = (initialloan * interestrate) / 12;
    interestcopy = interestcopy + interestreal;
    totalcost = Math.ceil(monthlycostfix) * payofftime + interestcopy;
    monthtotal = totalcost / counter;
    resttimeplus = initialloan / amortization;
    resttimeplus = Math.ceil(resttimeplus);
    document.getElementById('output').style.color = "green";
    document.getElementById('output').innerHTML = "Amortization amount per month_____:" + 
    Math.ceil(monthlycostfix) + ".      " + "First month (highest) cost________:" + 
    Math.ceil(firstmonth)  +  ". " + "Average cost per month____________:" + 
    Math.round(monthtotal) + ". " + "Total cost of loan:_______________:" + 
    Math.ceil(totalcost)+ ". " + "Bankloan:" + initialloan + " Interest rate:" + 
    interestrate*100 + "%" + "            Payoff years:" + payofftime/12;
    }
    else if(initialloan >= 10000 && monthlycostfix < 100)
    {
    restmonth = (initialloan / 100)/12;
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = " The amortization per month is below the recommended monthly payoff level(100), change payoff time to " + Math.round(restmonth) + " years." + " Bankloan:" + initialloan + " Interest rate:" + 
    interestrate*100 + "%" + "            Payoff years:" + payofftime/12;
    }
    else if(initialloan < 10000)
    {
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = " Change bank loan to minimum 10000";
    }
}

function clearform() {
    document.getElementById("calculate-inputs").reset();
    document.getElementById('calculate').disabled = "disabled";
    document.getElementById('calculate').style.color = "grey";
}


function enableButton(){
    const totalCost = document.getElementById('bankloan').value;
    const interestRate = document.getElementById('interest-rate').value;

    if (isNaN(parseFloat(totalCost))){
    document.getElementById('calculate').disabled = "disabled";
    document.getElementById('calculate').style.color = "grey";
    }else if (isNaN(parseFloat(interestRate)) || totalCost < 10000){
    document.getElementById('calculate').disabled = "disabled";
    document.getElementById('calculate').style.color = "grey";
    }else{
    document.getElementById('calculate').disabled = false;
    document.getElementById('calculate').style.color = "black";
    }
}

document.getElementById('bankloan').addEventListener("input", function(event){
    enableButton();
});

document.getElementById('interest-rate').addEventListener("input", function(event){
    enableButton();
});

document.getElementById('calculate').addEventListener("click", function(){
    calculate();

});

document.getElementById('clear').addEventListener("click", function(){
    clearform();
});
//End of of calculation and result output block.


document.getElementById('email-result').addEventListener("click", function(){
    SendMail();
});
function SendMail() {
    var params = {
    from_name : document.getElementById("fullName").value,
    email_id : document.getElementById("email-id").value,
    message : document.getElementById('output').innerHTML,
    };
    emailjs.send("service_j95t7f7", "template_k65yyrh", params).then(function (res) {alert("Success! " + res.status);
  });
}


    var emailField = document.getElementById("email-id");
    var emailError = document.getElementById("email-error");
    document.getElementById("email-error").style.color = "#b30000";
    const nameField = document.getElementById("fullName");
    var nameError = document.getElementById("name-error");
    document.getElementById("name-error").style.color =  "#b30000";
    let button = document.querySelector(".button");
    button.disabled = true;

// Code for validating email (specific coding)
function validateEmail(){
  
    button.disabled = true;
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value !== "")
    {
    emailError.innerHTML ="Enter a valid emailaddress";
    nameError.innerHTML ="";
    document.getElementById('email-result').style.color = "grey"  
    return false;
    }else if(emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value === "")
    {
    nameError.innerHTML ="Enter your name";
    emailError.innerHTML ="";
    document.getElementById('email-result').style.color = "grey"
    return false;
    }else if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value === "")
   {
    nameError.innerHTML ="Enter your name";
    emailError.innerHTML ="Enter a valid emailaddress";
    document.getElementById('email-result').style.color = "grey"
    return false;
    }
    emailError.innerHTML ="";
    nameError.innerHTML ="";
    button.disabled = false;  
    document.getElementById('email-result').style.color = "black";
}

document.getElementById('email-id').addEventListener("input", function(event){
   validateEmail();
  
});

document.getElementById('fullName').addEventListener("input", function(event){
   validateEmail();
  
});

//Mask bankloan field to only allow