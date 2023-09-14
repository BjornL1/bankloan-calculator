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
    var resttimemonth = 0;
    payofftime = payofftime * 12;
    var resttimeplus = resttime + payofftime;
    document.getElementById('output').style.color = "white";

    for (let i = 0; i < payofftime; i++) {

        counter = counter + 1;
        totalloan = loan;
        monthlycost = (loan * interestrate) / 12;

        loan = loan - amortization;
        resttimemonth = (loan / amortization);

    }

    if (loan <= 0) {
        resttimeplus = initialloan / amortization;
        resttimeplus = Math.ceil(resttimeplus);
        document.getElementById('output').style.color = "green";
        document.getElementById('output').innerHTML = "PASS! The loan will be paid within the target time. The loan will be paid after" + resttimeplus + "months";
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