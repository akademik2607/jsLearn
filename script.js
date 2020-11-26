'use strict'
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

