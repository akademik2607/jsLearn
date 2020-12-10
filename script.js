'use strict'; 



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
    period: 0,
    start: function (){
        
        this.budget = +salaryAmount.value;
        this.getExpenses();

        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncome();

        this.getBudget();
        this.showResult();

        const cancel = document.querySelector('#cancel');
        calculate.style.display = 'none';
        cancel.style.display = 'block';
        cancel.addEventListener('click', this.addCancel.bind(appData));
        this.addInputDisabled(true);
    },
    reset: function(){
        const inputs = document.querySelectorAll('input');
        const range = document.querySelector('[type="range"]');
        inputs.forEach(function(item){
            item.value = '';
        });
        range.value = '1';
        periodAmount.textContent = '1';

        this.income = {}; 
        this.addIncome.length = 0;
        this.expenses = {};
        this.addExpenses = [];
        for(let key in appData){
            if(typeof appData[key] !== 'function' && typeof appData[key] !== 'object'){
                appData[key] = 0;
            }
        }

    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', this.changeIncomePeriodValue);
    },
    addExpensesBlock: function(){

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
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
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
        for(let exp in this.expenses){ 
            this.expensesMonth += +this.expenses[exp]; 
        } 
    }, 
    getBudget : function(){ 
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
        this.budgetDay = Math.floor(this.budgetMonth / 30); 
    }, 
    getTargetMonth : function (){ 
        return Math.ceil( +targetAmount.value/ this.budgetMonth);
    },
    getStatusIncome : function(){
        if(this.budgetDay >= 1200){
            console.log('У вас высокий уровень дохода!');
        }
        else if(this.budgetDay >= 600){
            console.log('У вас середний уровень дохода!');
        }
        else if(this.budgetDay >= 0){
            console.log('К сожалению у вас очень низкий уровень дохода(');
        }
        else{
            console.log('Что-то пошло не так!');
        }
    },
    
    getTargetShow: function(){
        if(this.target >= 0) console.log("Ваша цель будет достигнута за "+ appData.target +" месяцев");
        else console.log("Цель не будет достигнута");
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do{
                this.percentDeposit = prompt("Какой процент по депозиту?", '8');
            }while(isNaN(+this.percentDeposit));
            do{
                this.moneyDeposit = +prompt("Сколько средств заложено?", 10000);
            }while(isNaN(+this.moneyDeposit));
        }
    },
    changePeriodAmount: function(){
        periodAmount.textContent = periodSelect.value;
    },
    changeIncomePeriodValue: function(){
        incomePeriodValue.value = this.calcSavedMoney();
    },
    checkSalaryAmount: function(){
        if(salaryAmount.value.trim() !== ''){
            calculate.removeAttribute('disabled');
            calculate.style.cursor = 'default';
        }
        else{
            calculate.setAttribute('disabled', 'disabled');
            calculate.style.cursor = 'not-allowed';
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    },
    addInputDisabled: function(flag){
        const inputs = document.querySelectorAll('input[type="text"]');
        if(flag){
            inputs.forEach(function(item){
                item.setAttribute('disabled', 'disabled');
            });
        }
        else{
            inputs.forEach(function(item){
                item.removeAttribute('disabled');
            });
        }
    },
    addCancel: function(){
            appData.reset();
            calculate.style.display = 'block'; 
            appData.checkSalaryAmount();
            cancel.style.display = 'none'; 
            cancel.removeEventListener('click', appData.addCansel);
            this.addInputDisabled(false);
        }
};

calculate.addEventListener('click', appData.start.bind(appData));
appData.checkSalaryAmount();
salaryAmount.addEventListener('input', appData.checkSalaryAmount.bind(appData));

expensesAddButton.addEventListener('click', appData.addExpensesBlock);
incomeAddButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodAmount.bind(appData));

appData.getTargetMonth();

appData.addInputDisabled();
//appData.getTargetShow();

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


