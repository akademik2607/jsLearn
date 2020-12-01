'use strict'

const isNumber = function(num){
    return !(isNaN(parseFloat(num))) && isFinite(num);
}

let money,
    addExpenses,
    deposit = false,
    expenses = [];
const income = 'Фриланс',
    mission = 4000000,
    period = 6,
    expensesCount = 2;

const start = function (){
    do{
    money = (prompt('Ваш месячный доход?'));
    } while(!isNumber(money)); 
    money = +money;
    addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ").toLowerCase().split(', ');
    console.log(addExpenses);
    deposit = confirm('Есть ли у вас депозит в банке?');
};

const showTypeOf = function(item){
    console.log(typeof item);
};



const getExpensesMonth = function(expenses){
    let sum = 0, temp;
    for(let i = 0; i < expensesCount; ++i){
        expenses[i] = prompt("Введите обязательную статью расходов: ");
        do{
        temp = prompt("Во сколько это обойдется: ");
        }while(!isNumber(temp));
        sum += parseFloat(temp);
    }
    console.log(expenses);
    return sum;
};


const getStatusIncome = function(budgetDay){
    if(budgetDay >= 1200){
        console.log('У вас высокий уровень дохода!');
    }
    else if(budgetDay >= 600 && budgetDay < 1200){
'use strict';


let money = 0;

const isNumber = function(temp){
    return !(isNaN(parseFloat(temp)) || !isFinite(temp) || temp === null || temp === '');
}
const start = function (){
    do{
    money = (prompt('Ваш месячный доход?'));
    } while(!isNumber(money) || +money <= 0); 
    money = +money;
}


start();

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expenses: {},
    target: 0,
    mission: 4000000,

    getExpensesMonth: function (){
        let sum = 0;
        for(let exp in appData.expenses){
            sum += appData.expenses[exp];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function (){
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = appData.expensesMonth / 30;
    },

    getTargetMonth: function (){
        appData.target =  appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function(){
        if(appData.budgetDay >= 1200){
            console.log("У Вас высокий уровень дохода!");
        }
        else if(appData.budgetDay >= 600){
            console.log("У Вас средний уровень дохода!");
        }
        else if(appData.budgetDay >= 0){
            console.log("У Вас очень низкий уровень дохода");
        }
        else console.log("Некорректное значение!");
    },

    asking: function (){
        let exp, temp;
        for(let i = 0; i < 2; ++i){
            exp = prompt("Введите обязательную статью расходов: ");
            do{
            temp = prompt('Во сколько это обойдется?');
            }while(!isNumber(temp) || +temp <= 0);
            appData.expenses[exp] = +temp;
        }
    },
    getTargetShow: function(){
        if(appData.target > 0) console.log("Ваша цель будет достигнута за "+ Math.ceil(appData.target) +" месяцев");
        else console.log("Цель не будет достигнута");
    }
    
}
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getTargetShow();

console.log(appData.expenses);


console.log("Расходы за месяц: ", appData.expensesMonth);
appData.getTargetShow();
appData.getStatusIncome();

console.log("Наша программа включает в себя данные: ");
for(let item in appData){
    console.log(item, appData[item]);
}

