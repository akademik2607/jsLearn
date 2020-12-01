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
        console.log('У вас средний уровень дохода!');
    }
    else if(budgetDay >= 0 && budgetDay < 600){
        console.log('К сожалению у вас очень низкий уровень дохода(');
    }
    else{
        console.log('Что-то пошло не так!');
    }
};

const getAccumulatedMonth = function(money , expenses){
    return money - expenses;
};

const getTargetMonth = function (accumulatedMonth, mission){
    return Math.ceil(mission / accumulatedMonth);
};

start();

const expensesAmount = getExpensesMonth(expenses);


const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


const budgetDay = accumulatedMonth / 30;
const target = getTargetMonth(accumulatedMonth, mission);

showTypeOf(money);
showTypeOf(income);
showTypeOf( deposit);
console.log("Расходы за месяц: " + expensesAmount);
console.log("Возможные расходы:" + addExpenses);
console.log("Период равен " + period + " месяцев.");

const getTargetShow = function(target){
    if(target >= 0) console.log("Ваша цель будет достигнута за "+ target +" месяцев");
    else console.log("Цель не будет достигнута");
}
console.log("Бюджет на день: " + Math.floor(budgetDay));
getStatusIncome(budgetDay);



