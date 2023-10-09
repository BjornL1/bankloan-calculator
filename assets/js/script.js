// Code for preventing anything but number (bankloan) and anything but number or dot for interest rate

let bankloan = document.getElementById("bankloan");
bankloan.addEventListener("input", function() {
    var bankcopy = bankloan.value; 
    bankcopy = bankcopy.replaceAll(/\D+/g, '');
    bankloan.value = bankcopy;
});


let interestmask = document.getElementById("interest-rate");
  interestmask.addEventListener("input", function() {
    var rate = interestmask.value; 
    rate = rate.replace(/[^0-9.]/g, '');
    interestmask.value = rate;
});


let fieldlength = document.getElementById("interest-rate");
fieldlength.addEventListener("input", function() {
    var copylength = fieldlength.value;
    fieldlength.value = copylength.replace(/\.{2,}/g, '.');
    if (fieldlength.value.includes(".")) {
        var splitfield = fieldlength.value.split('.');
        splitfield[1] = splitfield[1].substring(0, 2);
        fieldlength.value = splitfield.join('.');
    }else{
    fieldlength.value = fieldlength.value.substr(0, 2);
    }
});


// Code for adding numbers to dropdown menu (specific coding).

function addOptions() {
    var select = document.getElementById('payoff-years');
    var i = 0;
    do{
        select.options[select.options.length] = new Option(i + 1, i);
        i++;
    }while (i < 50);
    document.getElementById('calculate').style.color = "grey";
    document.getElementById('email-result').style.color = "grey";
}
addOptions();


// Code for calculation and result output block

function calculate() {  
    let loan = document.getElementById('bankloan').value;
    let interestrate = document.getElementById('interest-rate').value;
    interestrate = interestrate / 100;
    let payofftime = document.getElementById('payoff-years').selectedIndex +1;
    payofftime = payofftime * 12;
    
    const initialloan = loan;
    const amortization = Math.ceil(initialloan / payofftime);
    
    let firstmonth = Math.ceil((loan * interestrate)/12) + (loan/payofftime);
    let interesttotal = 0;
    let interesttemp = 0;
    let monthtotal = 0;
    let totalcost = 0;
  
    for (let i = 0; i < payofftime; i++) {
    loan = loan - amortization;
    interesttemp = (loan * interestrate) /12;
    interesttotal = interesttotal + interesttemp;
    }

    if (initialloan >= 10000 && amortization >= 100) {

    interesttotal = interesttotal + ((interestrate * initialloan) / 12);
    totalcost = Math.ceil(amortization) * payofftime + interesttotal;
    monthtotal = totalcost / payofftime;
    
    document.getElementById('output').style.color = "green";
    document.getElementById('output').innerHTML = "Amortization amount per month_____:" + 
    Math.ceil(amortization) + ". " + "First month (highest) cost________:" + 
    Math.ceil(firstmonth)  +  ". " + "Average cost per month____________:" + 
    Math.round(monthtotal) + ". " + "Total cost of loan:_______________:" + 
    Math.ceil(totalcost)+ ". " + "Bankloan:" + initialloan + " Interest rate:" + 
    interestrate*100 + "%" + " Payoff years:" + payofftime/12;
    
    }
    else if(initialloan >= 10000 && amortization < 100)
    {
    
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = " The amortization per month is below the recommended monthly payoff level(100), change payoff time to " + Math.round((initialloan / 100)/12) + " years." + " Bankloan:" + initialloan + " Interest rate:" + 
    interestrate*100 + "%" + " Payoff years:" + payofftime/12;
    }
//backup statement if calculation would be performed despite bankloan limit
    else if(initialloan < 10000)
    {
    document.getElementById('output').style.color = "red";
    document.getElementById('output').innerHTML = " Change bank loan to minimum 10000";
    }
}

// Code for clear calculation fields

function clearform() {
    document.getElementById("calculate-inputs").reset();
    document.getElementById('calculate').disabled = "disabled";
    document.getElementById('calculate').style.color = "grey";
}

// Code for enable calculate button

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


// Code for sending mail via EmailJS

function SendMail() {
    var params = {
    from_name : document.getElementById("fullName").value,
    email_id : document.getElementById("email-id").value,
    message : document.getElementById('output').innerHTML,
    };
    emailjs.send("service_j95t7f7", "template_k65yyrh", params).then(function (res) {alert("Success! " + res.status);
  });
}
document.getElementById('email-result').addEventListener("click", function(){
    SendMail();
});

// Code for validating email (specific coding)

    var emailField = document.getElementById("email-id");
    var emailError = document.getElementById("email-error");
    document.getElementById("email-error").style.color = "#b30000";
    const nameField = document.getElementById("fullName");
    var nameError = document.getElementById("name-error");
    document.getElementById("name-error").style.color =  "#b30000";
    let button = document.querySelector(".button");
    button.disabled = true;

function validateEmail(){
  
    button.disabled = true;
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value !== "")
    {
    emailError.innerHTML ="Enter a valid emailaddress";
    nameError.innerHTML ="";
    document.getElementById('email-result').style.color = "grey";  
    return false;
    }else if(emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value === "")
    {
    nameError.innerHTML ="Enter your name";
    emailError.innerHTML ="";
    document.getElementById('email-result').style.color = "grey";
    return false;
    }else if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&           
    nameField.value === "")
   {
    nameError.innerHTML ="Enter your name";
    emailError.innerHTML ="Enter a valid emailaddress";
    document.getElementById('email-result').style.color = "grey";
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

