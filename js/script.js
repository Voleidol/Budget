let expensesItem = document.querySelectorAll('.expenses-item'),
    optionalItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.getElementById('income'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    startBtn = document.getElementById('start'),
    savings = document.getElementById('savings'),
    chooseSum = document.getElementsByClassName('choose-sum')[0],
    choosePercent = document.getElementsByClassName('choose-percent')[0],

    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthValue = document.getElementsByClassName('monthsavings-value')[0],
    yearValue = document.getElementsByClassName('yearsavings-value')[0],
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');

let money, times; 

expensesBtn.disabled = true;
optionalBtn.disabled = true;
countBtn.disabled = true;
chooseSum.disabled = true;
choosePercent.disabled = true;

startBtn.addEventListener('click', function() {
    let money = +prompt('Введите ваш бюджет: ' + '');
    while (money == '' || money == null || isNaN(money)) {
        money = +prompt('Введите ваш бюджет: ' + '');
    }
    appData.budget = money;
    budgetValue.textContent = money.toFixed();

    let times = prompt('Введите дату вашего рождения в формате "ГГГГ-ММ-ДД"' + '');
    while(times == '' || times == null) {
        times = prompt('Введите дату вашего рождения в формате "ГГГГ-ММ-ДД"' + '');
    }
    year.value = new Date(Date.parse(times)).getFullYear(),
    month.value = new Date(Date.parse(times)).getMonth() + 1,
    day.value = new Date(Date.parse(times)).getDate();
    appData.time = times;
    if (year.value == NaN || month.value == NaN || day.value == NaN) {
        times = prompt('Введите дату вашего рождения в формате "ГГГГ-ММ-ДД"' + '');
    }
    console.log(appData);
    expensesBtn.disabled = false;
    optionalBtn.disabled = false;
    countBtn.disabled = false;
        
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
            
        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) === 'string' && typeof(b) != null
            && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            console.log(appData);
            sum += +b;
        } else {
            i = i-1;
        }
    }
    expensesValue.textContent = sum;
});

optionalBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalItem.length; i++) {
        let opt = optionalItem[i].value;
        if (typeof(opt) != null && typeof(opt) != '' && opt.length < 50) {
            appData.optional[i] = opt;
            optionalexpValue.textContent += appData.optional[i] + ' ';
        }
    }
});

let moneyPerDay;

countBtn.addEventListener('click', function() {   
    if (expensesValue.textContent > 0) {
        let moneyPerDay = (appData.budget - expensesValue.textContent)/30;
        appData.dayBudget = moneyPerDay;
        daybudgetValue.textContent = appData.dayBudget.toFixed();

    } else {
        let moneyPerDay = appData.budget/30;
        appData.dayBudget = moneyPerDay;
        daybudgetValue.textContent = appData.dayBudget;
    }

    if (appData.dayBudget < 800) {
        levelValue.textContent = 'Min level';
    } else  if (appData.dayBudget >= 800 && appData.dayBudget < 1100) {
        levelValue.textContent = 'Midle level';
    } else if (appData.dayBudget >= 1100) {
        levelValue.textContent = 'High level';
    }
});

savings.addEventListener('click', function() {
    chooseSum.disabled = false;
    choosePercent.disabled = false;
});


chooseSum.addEventListener('input', function() {
    let sum = +chooseSum.value;
    let percent = +choosePercent.value;
    if (sum != '' && typeof(sum) != null && !isNaN(sum) && percent != '' && typeof(percent) != null && !isNaN(percent)) {
        monthValue.textContent = sum/100*percent;
        yearValue.textContent = sum/100*percent*12;
    } else {
        monthValue.textContent = '0';
        yearValue.textContent = '0';
    }
    
});

choosePercent.addEventListener('input', function() {
    let sum = +chooseSum.value;
    let percent = +choosePercent.value;
    if (sum != '' && typeof(sum) != null && !isNaN(sum) && percent != '' && typeof(percent) != null && !isNaN(percent)) {
        monthValue.textContent = sum/100*percent;
        yearValue.textContent = sum/100*percent*12;
    } else {
        monthValue.textContent = '0';
        yearValue.textContent = '0';
    }
    
});

chooseIncome.addEventListener('input', function() {
    let inc = chooseIncome.value;
    if (inc != '' && typeof(inc) != null) {
        appData.income = inc.split(', ');
        incomeValue.textContent = appData.income;
    }
});

let appData =  {
    budget: money,
    dayBudget: moneyPerDay,
    time: times,
    income: [],
    expenses: {},
    optional: [],
};
