
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

let accumulatedMonth = getAccumulatedMonth(money, expenses);


let budgetDay = accumulatedMonth / 30;
let target = getTargetMonth(accumulatedMonth, mission);

showTypeOf(money);
showTypeOf(income);
showTypeOf( deposit);
console.log("Расходы за месяц: " + expenses);
console.log("Возможные расходы:" + addExpenses.toLowerCase().split(', '));
console.log("Период равен " + period + " месяцев.");

console.log('Ваша цель будет достигнута за: ', Math.ceil(mission / accumulatedMonth), 'месяцев.');
console.log("Бюджет на день: " + Math.floor(budgetDay));
getStatusIncome(budgetDay);
