function calculate() {
    let loan = document.getElementById('totalcost').value;
    let interestrate = document.getElementById('interest-rate').value;
    let amortization = document.getElementById('monthly-payoff').value;
    let payofftime = document.getElementById('year-payoff').value;


    let initialloan = loan;
    let totalloan = loan * interestrate;
    let monthlycost = (loan * interestrate) / 12;
    let counter = 0;

    let restmonth = 0;
    var resttime = 0;
    var resttimeplus = resttime + payofftime;


    for (let i = 0; i < payofftime; i++) {

        counter = counter + 1;
        totalloan = loan;
        monthlycost = (loan * interestrate) / 12;

        loan = loan - amortization;
        resttime = (loan / amortization);
        resttime = Math.round(resttime);
    }

    if (loan <= 0) {
        resttimeplus = initialloan / amortization;
        resttimeplus = Math.ceil(resttimeplus);
        document.getElementById('output').innerHTML = "PASS! The loan will be paid within the target time. The loan will be paid after" + resttimeplus + "months";
    }
    else {
        restmonth = (initialloan / counter) - amortization;
        document.getElementById('output').innerHTML = "FAIL! Increase the montly payoff by " + restmonth + "to achive the target time or increase the payoff time with " + resttime + " months to achive the monthly cost target" + " You can also adjust both inputs to achieve another result";

    }
}

function clearform() {
    document.getElementById("inputfields").reset();
}