
function quantity(amount) {
    var select = document.getElementById('quantiti');
    for (var i = 0; i < amount; i++) {
        select.options[select.options.length] = new Option(i + 1, i);
    }
}

quantity(50);

function drop() {
    let test = document.getElementById('quantiti').selectedIndex + 1;
    document.getElementById('out').value = test + 1;
    let testcost = 10;
    testcost = test * testcost;
    document.getElementById('output').innerHTML = testcost;

}




function calculate() {
    /* code for dropdown function*/


    /*rest of code*/


    let loan = document.getElementById('totalcost').value;
    let interestrate = document.getElementById('interest-rate').value;
    let amortization = 0;
    let payofftime = document.getElementById('quantiti').selectedIndex + 1;

    interestrate = interestrate / 100;
    let initialloan = loan;
    let totalloan = loan * interestrate;
    let monthlycost = (loan * interestrate) / 12;
    let loancopy = 0;
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
    let monthlycostfix = initialloan / payofftime;
    let totalcost = 0;
    let loanextra = 0;
    let monthtotal = 0;
    document.getElementById('output').style.color = "white";

    for (let i = 0; i < payofftime; i++) {



        counter = counter + 1;
        totalloan = loan;
        monthlycost = (loan * interestrate) / 12;
        month = monthlycost;
        loan = loan - monthlycostfix;
        resttimemonth = (loan / amortization);
        monthlycostfinal = monthlycost + month;
        loanextra = (loan * interestrate) / 12;
        interestcopy = interestcopy + loanextra;
    }

    if (loan <= 0) {

        monthlycost = (initialloan * interestrate) / 12;
        interestcopy = interestcopy + interestreal;
        totalcost = Math.ceil(monthlycostfix) * payofftime + interestcopy;
        monthtotal = totalcost / counter;
        resttimeplus = initialloan / amortization;
        resttimeplus = Math.ceil(resttimeplus);
        document.getElementById('output').style.color = "green";
        document.getElementById('output').innerHTML = "The amortiziation cost per month will be: " + Math.ceil(monthlycostfix) + "." + " The total cost of the loan will be " + Math.ceil(totalcost) + " The average cost per month will be: " + Math.ceil(monthtotal);
    }
    else {
        restmonth = (initialloan / counter) - amortization;
        document.getElementById('output').style.color = "red";
        document.getElementById('output').innerHTML = "FAIL! Increase the montly" + "<br>" + "payoff by " + Math.ceil(restmonth) + " to achive the target time or increase the payoff time with " + Math.ceil(resttimemonth) + " months to achive the monthly cost target" + " You can also adjust both inputs to achieve another result";

    }
}

function clearform() {
    document.getElementById("inputfields").reset();
}


function SendMail() {
    var params = {
        from_name: document.getElementById("fullName").value,
        email_id: document.getElementById("email_id").value,
        message: document.getElementById('output').innerHTML,
    };
    emailjs.send("service_j95t7f7", "template_k65yyrh", params).then(function (res) {
        alert("Success! " + res.status);

    });
}





/*




function
  var ind = document.getElementById('quantiti').selectedIndex;
  var opt = document.getElementsByTagName('option')[ind].value;
  var sudo = document.getElementsByTagName('option')[ind].innerHTML = opt;*/





