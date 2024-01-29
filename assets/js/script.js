/*
The following three code blocks are designed to prevent users trying
to insert invalid characters in the input fields thus ensuring correct/rational data
is used for the calculations.
First block: Allows only digits for the bank loan input to be added.
Second block: Allows only digits and dots for interest rate input (the dot is the decimal point).
Third block: Allows only two decimals after the dot for the interest rate input.
*/

let bankLoan = document.getElementById("bankloan");
bankLoan.addEventListener("input", function () {
  let bankCopy = bankLoan.value;
  bankCopy = bankCopy.replaceAll(/\D+/g, "");
  bankLoan.value = bankCopy;
});

let interestMask = document.getElementById("interest-rate");
interestMask.addEventListener("input", function () {
  let rate = interestMask.value;
  rate = rate.replace(/[^0-9.]/g, "");
  interestMask.value = rate;
});

let fieldLength = document.getElementById("interest-rate");
fieldLength.addEventListener("input", function () {
  let copyLength = fieldLength.value;
  let dotCount = copyLength.split('.').length - 1;
  if (dotCount > 1) {
    copyLength = copyLength.slice(0, copyLength.lastIndexOf('.'));
  }
  fieldLength.value = copyLength.replace(/\.{2,}/g, ".");
  if (fieldLength.value.includes(".")) {
    let splitField = fieldLength.value.split(".");
    splitField[1] = splitField[1].substring(0, 2);
    fieldLength.value = splitField.join(".");
  } else {
    fieldLength.value = fieldLength.value.substr(0, 2);
  }
});

// Adding numbers to the drop down menu for users to choose payoff years(specific coding).

function addOptions() {
  let select = document.getElementById("payoff-years");
  let i = 0;
  do {
    select.options[select.options.length] = new Option(i + 1, i);
    i++;
  } while (i < 50);
  document.getElementById("calculate").style.color = "grey";
  document.getElementById("email-result").style.color = "grey";
}
addOptions();

/*
The calculation code returns a table with results to to the user, if the values presented
in the output field are within the recommended range (described under the header of the page), the 
values will be displayed in green indicating proper input has been given. For values outside this range the
messages will include a recommendation and are displayed in red. If, for any a reason a calculation 
would be performed below the limit of bank loan of 10000, a back-up message will be displayed in red.
*/

function calculate() {
  let loan = document.getElementById("bankloan").value;
  let interestRate = document.getElementById("interest-rate").value;
  interestRate = interestRate / 100;
  let payoffTime = document.getElementById("payoff-years").selectedIndex + 1;
  payoffTime = payoffTime * 12;

  let initialLoan = loan;
  let amortization = Math.ceil(initialLoan / payoffTime);

  let firstMonth = Math.ceil((loan * interestRate) / 12) + loan / payoffTime;
  let interestTotal = 0;
  let interestTemp = 0;
  let monthTotal = 0;
  let totalCost = 0;

  for (let i = 0; i < payoffTime; i++) {
    loan = loan - amortization;
    interestTemp = (loan * interestRate) / 12;
    interestTotal = interestTotal + interestTemp;
  }

  if (initialLoan >= 10000 && amortization >= 100) {
    interestTotal = interestTotal + (interestRate * initialLoan) / 12;
    totalCost = Math.ceil(amortization) * payoffTime + interestTotal;
    monthTotal = totalCost / payoffTime;

    document.getElementById("output").style.color = "green";
    document.getElementById("output").innerHTML =
      "Amortization amount per month_____:" +
      Math.ceil(amortization) +
      ". " +
      "First month (highest) cost________:" +
      Math.ceil(firstMonth) +
      ". " +
      "Average cost per month____________:" +
      Math.round(monthTotal) +
      ". " +
      "Total cost of loan:_______________:" +
      Math.ceil(totalCost) +
      ". " +
      "Bankloan:" +
      initialLoan +
      " Interest rate:" +
      interestRate * 100 +
      "%" +
      " Payoff years:" +
      payoffTime / 12;
  } else if (initialLoan >= 10000 && amortization < 100) {
    document.getElementById("output").style.color = "red";
    document.getElementById("output").innerHTML =
      " The amortization per month is below the recommended monthly payoff level(100), change payoff time to " +
      Math.round(initialLoan / 100 / 12) +
      " years." +
      " Bankloan:" +
      initialLoan +
      " Interest rate:" +
      interestRate * 100 +
      "%" +
      " Payoff years:" +
      payoffTime / 12;
  } else if (initialLoan < 10000) {
    document.getElementById("output").style.color = "red";
    document.getElementById("output").innerHTML =
      " Change bank loan to minimum 10000";
  }
}

// Code for clearing calculation fields and enable new input.

function clearform() {
  document.getElementById("calculate-inputs").reset();
  document.getElementById("calculate").disabled = "disabled";
  document.getElementById("calculate").style.color = "grey";
}

/*Code for enable calculate button, the button is conditionally
enabled to guide user to enter correct input, if the inputs are not 
numbers (interest rate and bank loan) or to low value (bank loan)*/

function enableButton() {
  let loanEnable = document.getElementById("bankloan").value;
  let interestEnable = document.getElementById("interest-rate").value;

  if (isNaN(parseFloat(loanEnable))) {
    document.getElementById("calculate").disabled = "disabled";
    document.getElementById("calculate").style.color = "grey";
  } else if (isNaN(parseFloat(interestEnable)) || loanEnable < 10000) {
    document.getElementById("calculate").disabled = "disabled";
    document.getElementById("calculate").style.color = "grey";
  } else {
    document.getElementById("calculate").disabled = false;
    document.getElementById("calculate").style.color = "black";
  }
}

/*The event listeners are structured according to a logic order of sequence,
the first two blocks are called before any calculation is performed and enables 
the third (calculate) event listener which is triggered by mouse click*/

document.getElementById("bankloan").addEventListener("input", function () {
  enableButton();
});

document.getElementById("interest-rate").addEventListener("input", function () {
  enableButton();
});

document.getElementById("calculate").addEventListener("click", function () {
  calculate();
});

// The clear fields event listener can call the function independently of status for the input fields.

document.getElementById("clear").addEventListener("click", function () {
  clearform();
});

// Code for sending mail via EmailJS

function SendMail() {
    var params = {
      from_name: document.getElementById("fullName").value,
      email_id: document.getElementById("email-id").value,
      message: document.getElementById("output").innerHTML,
    };
    emailjs
      .send("service_j95t7f7", "template_k65yyrh", params)
      .then(function (res) {
        alert("Success! " + res.status);
      });
  }
  document.getElementById("email-result").addEventListener("click", function () {
    SendMail();
  });
  
/*Code for validating email (specific coding), this ensures
a valid email (valid characters included) and name is 
entered ensuring a result to be sent intentionally 
and also to the correct address. The red marked error messages are displayed
to highlight faulty or missing input.
*/

var emailField = document.getElementById("email-id");
var emailError = document.getElementById("email-error");
document.getElementById("email-error").style.color = "#b30000";
const nameField = document.getElementById("fullName");
var nameError = document.getElementById("name-error");
document.getElementById("name-error").style.color = "#b30000";
let button = document.querySelector(".button");
button.disabled = true;

function validateEmail() {
  button.disabled = true;
  if (
    !emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&
    nameField.value !== ""
  ) {
    emailError.innerHTML = "Enter a valid emailaddress";
    nameError.innerHTML = "";
    document.getElementById("email-result").style.color = "grey";
    return false;
  } else if (
    emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&
    nameField.value === ""
  ) {
    nameError.innerHTML = "Enter your name";
    emailError.innerHTML = "";
    document.getElementById("email-result").style.color = "grey";
    return false;
  } else if (
    !emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) &&
    nameField.value === ""
  ) {
    nameError.innerHTML = "Enter your name";
    emailError.innerHTML = "Enter a valid emailaddress";
    document.getElementById("email-result").style.color = "grey";
    return false;
  }
  emailError.innerHTML = "";
  nameError.innerHTML = "";
  button.disabled = false;
  document.getElementById("email-result").style.color = "black";
}

/*The event listeners are calling the validate function for any input entered
in the mail or name field*/

document.getElementById("email-id").addEventListener("input", function () {
  validateEmail();
});

document.getElementById("fullName").addEventListener("input", function () {
  validateEmail();
});
