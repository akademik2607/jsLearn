let mony = 30000;
let incomy = 'Фриланс';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = false;
let mission = 4000000;
let period = 6;

console.log(typeof mony);
console.log(typeof incomy);
console.log(typeof deposit);

mony = +(prompt('Ваш месячный доход?'));
addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ").split(', ');
console.log(addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt("Введите обязательную статью расходов: ");
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt("Введите обязательную статью расходов: ");
let amount2 = +prompt('Во сколько это обойдется?');

/*function addExpenses(amount1, amount2){
    let expenses = Array();
    expenses[0] = amount1;
    expenses[1] = amount2;
    console.log(expenses);
}*/

function getAccumulatedMonth (mony , expenses){
    return mony - expenses;
}

function getExpensesMonth(amount1, amount2){
    return amount1 + amount2;
}
let expenses = getExpensesMonth(amount1, amount2);

let accumulatedMonth = getAccumulatedMonth(mony, expenses);

function getTargetMonth (accumulatedMonth, mission){
    return mission / accumulatedMonth;
}

let budgetDay = accumulatedMonth / 30;
let target = getTargetMonth(accumulatedMonth, mission);


