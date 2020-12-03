'use strict' 



//Получение элементов на странице

const calculate = document.getElementById('start');

const buttonPlusList = document.getElementsByTagName('button');


let incomeAddButton,
    expensesAddButton;
for(let i = 0; i < buttonPlusList.length; ++i){
    if(buttonPlusList[i].classList.contains('btn_plus')){
        if(buttonPlusList[i].classList.contains('income_add')){
            incomeAddButton = buttonPlusList[i];
        }
        else if(buttonPlusList[i].classList.contains('expenses_add')){
            expensesAddButton = buttonPlusList[i];
        }
    }
}




const depositCheck = document.querySelector('#deposit-check');
 
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
  

//Поля справа
const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value'); 
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');

//Поля слева 
const salaryAmount = document.querySelector('.salary-amount');

const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');

const additionalIncomeItems = document.querySelectorAll('.additionalIncomeItem');  // Массив

const expensesTitle = document.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');

const additionalExpensesItem = document.querySelector('.additional_expenses-item');

const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

const targetAmount = document.querySelector('.target-amount');

const periodSelect = document.querySelector('.period-select');
           
            
            


const isNumber = function(num){ 
    return !(isNaN(parseFloat(num))) && isFinite(num); 
};

let money;

const start = function (){
    do{
    money = (prompt('Ваш месячный доход?'));
    } while(!isNumber(money)); 
    money = +money;
};

let appData = {
    income: {},
    addIncome: [],
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expenses:{},  
    addExpenses:[], 
    target: 0,
    expensesCount: 2,
    mission: 4000000,
    period: 6,
    asking: function(){

        if(confirm("Есть ли у Вас дополнительный источник дохода?")){
            let itemIncome, cashIncome;
            do{
                itemIncome = prompt("Каков источник вашего дополнительного дохода?", 'Пою песни');
            }while(!isNaN(+itemIncome));
            do{
                cashIncome = +prompt("Каков размер вашего дополнительного дохода?", '15000');
            }while(isNaN(+cashIncome));
            appData.income[itemIncome] = cashIncome;
        } 

        let expName;
        for(let i = 0; i < appData.expensesCount; ++i){
            do{
            expName = prompt("Введите обязательную статью расходов: ");
            }while(!isNaN(expName));
            do{
            appData.expenses[expName] = prompt("Во сколько это обойдется: ");
            }while(!isNumber(appData.expenses[expName]));
            appData.expenses[expName] = +appData.expenses[expName];
        }
        appData.addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ").toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }, 
    getExpensesMonth: function(){ 
        for(let exp in appData.expenses){ 
            appData.expensesMonth += +appData.expenses[exp]; 
        } 
    }, 
    getBudget : function(){ 
        appData.budgetMonth = appData.budget - appData.expensesMonth; 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    }, 
    getTargetMonth : function (){ 
        appData.target = Math.ceil(appData.mission / appData.budgetMonth);
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
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};
start();
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log("Расходы за месяц: " + appData.expensesMonth);
appData.getTargetShow();
appData.getStatusIncome();

console.log("Наша программа включает в себя данные:");
for(let item in appData){
    console.log(appData[item]);
}

let str = '';
for(let i = 0; i < appData.addExpenses.length; ++i){
    str += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1); 
    if(i !== appData.addExpenses.length - 1){
        str += ', ';
    }
}
console.log(str);


