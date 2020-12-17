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

class AppData{
    constructor(){
        this.income = {};
        this.addIncome = [];
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};  
        this.addExpenses = []; 
        this.target = 0;
        this.period = 0;

    }
    start(){
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
        cancel.addEventListener('click', this.addCancel);
        this.addInputDisabled(true);
    }
    reset(){
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
        for(let key in this){
            if(typeof this[key] !== 'function' && typeof this[key] !== 'object'){
                this[key] = 0;
            }
        }
        incomeAddButton.style.display = 'block';
        expensesAddButton.style.display = 'block';
        const incomeParent = incomeItems[0].parentNode,
            expensesParent = expensesItems[0].parentNode;
        for(let item  = 1; item <  incomeItems.length; ++item){
            incomeItems[item].remove();
        }
        for(let item  = 1; item <  expensesItems.length; ++item){
            expensesItems[item].remove();
        }
    }

    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', this.changeIncomePeriodValue.bind(this));
    }

    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddButton);
        expensesItems= document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesAddButton.style.display = 'none';
        }
    }

    addIncomeBlock(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddButton);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomeAddButton.style.display = 'none';
        }
    }

    getExpenses(){
        const _this = this;
        expensesItems.forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value,
                  cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome(){
    const _this = this;
        incomeItems.forEach(function(item){
            const titleIncome = item.querySelector('.income-title').value,
                  amountIncome = item.querySelector('.income-amount').value;
            if(titleIncome !== ''&& amountIncome !== ''){
                _this.income[titleIncome] = amountIncome; 
            }
        });
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }
    
    getAddExpenses(){
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(','); 
        addExpenses.forEach(function(item){
            if(item.trim() !== ''){
                _this.addExpenses.push(item.trim());
            }
        });
    }

    getAddIncome(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            const itemVal = item.value.trim();
            if(itemVal !== ''){
                _this.addIncome.push(itemVal);
            }
        });
    }

    getExpensesMonth(){
        for(let exp in this.expenses){ 
            this.expensesMonth += +this.expenses[exp]; 
        } 
    }

    getBudget(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
        this.budgetDay = Math.floor(this.budgetMonth / 30); 
    }
    
    getTargetMonth(){
        return Math.ceil( +targetAmount.value/ this.budgetMonth);
    }
    
    getStatusIncome(){
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
    }

    getTargetShow(){
        if (this.target >= 0) console.log("Ваша цель будет достигнута за "+ appData.target +" месяцев");
        else console.log("Цель не будет достигнута");
    }

    getInfoDeposit(){
        if(this.deposit){
            do{
                this.percentDeposit = prompt("Какой процент по депозиту?", '8');
            }while(isNaN(+this.percentDeposit));
            do{
                this.moneyDeposit = +prompt("Сколько средств заложено?", 10000);
            }while(isNaN(+this.moneyDeposit));
        }
    }
    
    changePeriodAmount(){
        periodAmount.textContent = periodSelect.value;
    }

    changeIncomePeriodValue(){
        incomePeriodValue.value = this.calcSavedMoney();
    }

    checkSalaryAmount(){
        if(salaryAmount.value.trim() !== ''){
            calculate.removeAttribute('disabled');
            calculate.style.cursor = 'default';
        }
        else{
            calculate.setAttribute('disabled', 'disabled');
            calculate.style.cursor = 'not-allowed';
        }
    }

    calcSavedMoney(){
        return this.budgetMonth * periodSelect.value;
    }

    addInputDisabled(flag){
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
    }

    addCansel(){
        this.reset();
        calculate.style.display = 'block'; 
        this.checkSalaryAmount();
        cancel.style.display = 'none'; 
        cancel.removeEventListener('click', this.addCansel);
        this.addInputDisabled(false);

    }

    eventListeners(){
        calculate.addEventListener('click', appData.start.bind(appData));
        this.checkSalaryAmount();
        salaryAmount.addEventListener('input', appData.checkSalaryAmount.bind(appData));

        expensesAddButton.addEventListener('click', appData.addExpensesBlock);
        incomeAddButton.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.changePeriodAmount.bind(appData));

        this.getTargetMonth();

        this.addInputDisabled();

    }
}


const appData = new AppData();

appData.eventListeners();


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


