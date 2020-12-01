'use strict'



let money = 30000,
income = 'Фриланс',
addExpenses = 'интернет, такси, коммуналка',
deposit = false,
mission = 4000000,
period = 6;

const showTypeOf = function(item){
    console.log(typeof item);
};

money = +(prompt('Ваш месячный доход?', '50000'));
addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ");
deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt("Введите обязательную статью расходов: ", 'Коммуналка');
const amount1 = +prompt('Во сколько это обойдется?', '5000');
const expenses2 = prompt("Введите обязательную статью расходов: ", 'Транспорт');
const amount2 = +prompt('Во сколько это обойдется?', '10000');



const getStatusIncome = function(budgetDay){
    if(budgetDay >= 1200){
        console.log('У вас высокий уровень дохода!');
    }
    else if(budgetDay >= 600 && budgetDay < 1200){
        console.log('У вас средний уровень дохода!');
    }
    else if(budgetDay >= 0 && budgetDay < 600){
        console.log('К сожалению у вас очень низкий уровень дохода(');
    }
    else{
        console.log('Что-то пошло не так!');
    }
};

const getExpensesMonth = function(amount1, amount2){
    return amount1 + amount2;
};

const getAccumulatedMonth = function(money , expenses){
    return money - expenses;
};

const getTargetMonth = function (accumulatedMonth, mission){
    return mission / accumulatedMonth;
};

let expenses = getExpensesMonth(amount1, amount2);



function getAccumulatedMonth (mony , expenses){
    return mony - expenses;
}

function getExpensesMonth(expenses){
    let sum = 0;
    for(let i = 0; i < 2; ++i){
        sum += expenses[i];
    }
    return sum;
}

let mony;
let incomy;
let addExpenses;
let deposit;
let mission = 4000000;
let period6;

let expenses1; 
let expenses2; 
let expenses = Array();
const start = function (){
    do{
    mony = (prompt('Ваш месячный доход?'));
    } while(isNaN(mony) ||!isFinite(mony) || mony === ''); 
    mony = +mony;
    addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ").split(', ');
    console.log(addExpenses);
    deposit = confirm('Есть ли у вас депозит в банке?');
    
    for(let i = 0; i < 2; ++i){
        expenses1 = prompt("Введите обязательную статью расходов: ");
        expenses[i] = +prompt('Во сколько это обойдется?');
    }
}

const getTargetShow = function(target){
    if(target >= 0) console.log("Ваша цель будет достигнута за "+ target +" месяцев");
    else console.log("Цель не будет достигнута");
}
start();


console.log(typeof mony);
console.log(typeof incomy);
console.log(typeof deposit);

let sumExpenses = getExpensesMonth(expenses);

let accumulatedMonth = getAccumulatedMonth(mony, sumExpenses);

function getTargetMonth (accumulatedMonth, mission){
    return mission / accumulatedMonth;
}

let budgetDay = accumulatedMonth / 30;
let target = getTargetMonth(accumulatedMonth, mission);

getTargetShow(target);

