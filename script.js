let money = 30000;
incomy = 'Фриланс',
addExpenses = 'интернет, такси, коммуналка',
deposit = false,
mission = 4000000,
period = 6;

console.log(typeof money);
console.log(typeof incomy);
console.log(typeof deposit);

money = +(prompt('Ваш месячный доход?','50000'));
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

function getAccumulatedMonth (money , expenses){
    return money - expenses;
}

function getExpensesMonth(amount1, amount2){
    return amount1 + amount2;
}
let expenses = getExpensesMonth(amount1, amount2);

let accumulatedMonth = getAccumulatedMonth(money, expenses);

function getTargetMonth (accumulatedMonth, mission){
    return mission / accumulatedMonth;
}

let budgetDay = accumulatedMonth / 30;
let target = getTargetMonth(accumulatedMonth, mission);


