'use strict' 



//Получение элементов на странице

const calculate = document.getElementById('start');

const incomeAddButton = document.getElementsByTagName('button')[0],
      expensesAddButton = document.getElementsByTagName('button')[1];

const depositCheck = document.querySelector('#deposit-check');
 
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
  

//Поля справа
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], 
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0];
//Поля слева 
const salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      additionalIncomeItems = document.querySelectorAll('.additionalIncomeItem'),  // Массив
      expensesTitle = document.querySelector('.expenses-title'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount');
      console.log(periodSelect);           
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');
            


const isNumber = function(num){ 
    return !(isNaN(parseFloat(num))) && isFinite(num); 
};

let money;


let appData = {
    income: {},
    addIncome: [],
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expenses:{},  
    addExpenses:[], 
    target: 0,
    expensesCount: 2,
    period: 6,
    start: function (){
        
        appData.budget = +salaryAmount.value;
        appData.getExpenses();

        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();

        appData.getBudget();
        appData.showResult();
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', appData.changeIncomePeriodValue);
    },
    addExpensesBlock: function(){
        console.log(expensesItems.parentNode); 

        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems= document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAddButton.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAddButton.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value,
                  cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            const titleIncome = item.querySelector('.income-title').value,
                  amountIncome = item.querySelector('.income-amount').value;
            if(titleIncome !== ''&& amountIncome !== ''){
                appData.income[titleIncome] = amountIncome; 
            }
        });
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){
        const addExpenses = additionalExpensesItem.value.split(','); 
        addExpenses.forEach(function(item){
            if(item.trim() !== ''){
                appData.addExpenses.push(item.trim());
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            const itemVal = item.value.trim();
            if(itemVal !== ''){
                appData.addIncome.push(itemVal);
            }
        });
    },
    getExpensesMonth: function(){ 
        for(let exp in appData.expenses){ 
            appData.expensesMonth += +appData.expenses[exp]; 
        } 
    }, 
    getBudget : function(){ 
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    }, 
    getTargetMonth : function (){ 
        return Math.ceil( +targetAmount.value/ appData.budgetMonth);
    },
    getStatusIncome : function(){
        if(appData.budgetDay >= 1200){
            console.log('У вас высокий уровень дохода!');
        }
        else if(appData.budgetDay >= 600){
            console.log('У вас середний уровень дохода!');
        }
        else if(appData.budgetDay >= 0){
            console.log('К сожалению у вас очень низкий уровень дохода(');
        }
        else{
            console.log('Что-то пошло не так!');
        }
    },
    
    getTargetShow: function(){
        if(appData.target >= 0) console.log("Ваша цель будет достигнута за "+ appData.target +" месяцев");
        else console.log("Цель не будет достигнута");
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt("Какой процент по депозиту?", '8');
            }while(isNaN(+appData.percentDeposit));
            do{
            appData.moneyDeposit = +prompt("Сколько средств заложено?", 10000);
            }while(isNaN(+appData.moneyDeposit));
        }
    },
    changePeriodAmount: function(){
        periodAmount.innerHTML = periodSelect.value;
    },
    changeIncomePeriodValue: function(){
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    checkSalaryAmount: function(){
        if(salaryAmount.value.trim() !== ''){
            calculate.addEventListener('click', appData.start);
        }
        else{
            calculate.removeEventListener('click', appData.start);
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * periodSelect.value;
    },
};

salaryAmount.addEventListener('change', appData.checkSalaryAmount);

expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodAmount);

appData.getTargetMonth();

appData.getTargetShow();

/*console.log("Наша программа включает в себя данные:");
for(let item in appData){
    console.log(appData[item]);
}*/

/*let str = '';
for(let i = 0; i < appData.addExpenses.length; ++i){
    str += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1); 
    if(i !== appData.addExpenses.length - 1){
        str += ', ';
    }
}
console.log(str);*/


