function quantity(amount){
    var select = document.getElementById('payoff-years');
    for (var i = 0; i < amount; i++){
    select.options[select.options.length] = new Option(i+1, i);
  }
 document.getElementById('calculate').style.color = "grey";
}

quantity(50);



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
  let paycheck = 2;
  let diffcheck= 0;
  
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
    document.getElementById('output').innerHTML = "Amortization amount per month_____:" + Math.ceil(monthlycostfix) + ".      " + "First month (highest) cost________:" + Math.ceil(firstmonth)  +  ". " + "Average cost per month____________:" 
      + Math.round(monthtotal) + ". " + "Total cost of loan:_______________:" + Math.ceil(totalcost) +  ". ";
  

  }
  else if(initialloan >= 10000 && monthlycostfix < 100)
  {
    restmonth = (initialloan / 100)/12;
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = " The amortization per month is below the recommended payoff level(100), change payoff time to " + Math.round(restmonth) + " years.";

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
  document.getElementById('calculate').style.color = "#909090";
}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function enableButton(){
    const totalCost = document.getElementById('bankloan').value;
    const interestRate = document.getElementById('interest-rate').value;
    if (isNaN(parseFloat(totalCost))){
        document.getElementById('calculate').disabled = "disabled";
        document.getElementById('calculate').style.color = "grey";
    }else{
        if (isNaN(parseFloat(interestRate))){
            document.getElementById('calculate').disabled = "disabled";
            document.getElementById('calculate').style.color = "grey";
        }else{
            document.getElementById('calculate').disabled = false;
            document.getElementById('calculate').style.color = "black";
          
        }
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
var check = document.getElementById("fullName").value;
button.disabled = true;


function validateEmail(){
  
    button.disabled = true;
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
        nameField.value !== "")
    {
    emailError.innerHTML ="Enter a valid emailaddress";
    nameError.innerHTML ="";
      
    return false;
    }else if(emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
        nameField.value === "")
    {
        nameError.innerHTML ="Enter your name";
        emailError.innerHTML ="";
        return false;
    }else if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
        nameField.value === "")
   {
        nameError.innerHTML ="Enter your name";
        emailError.innerHTML ="Enter a valid emailaddress";
     
        return false;
    }

emailError.innerHTML ="";
nameError.innerHTML ="";
button.disabled = false;  

}

document.getElementById('email-id').addEventListener("input", function(event){
   validateEmail();
  
});

document.getElementById('fullName').addEventListener("input", function(event){
   validateEmail();
  
});





/*




function
  var ind = document.getElementById('quantiti').selectedIndex;
  var opt = document.getElementsByTagName('option')[ind].value;
  var sudo = document.getElementsByTagName('option')[ind].innerHTML = opt;*/





