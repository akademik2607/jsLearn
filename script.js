let mony = 30000;
let incomy = 'Фриланс';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = false;
let mission = 4000000;
let period = 6;

console.log(typeof mony);
console.log(typeof incomy);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев.");
console.log('Цель: заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(' '));

let budgetDay = mony / 30;
console.log(budgetDay);

money = +(prompt('Ваш месячный доход?'));
addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ");
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt("Введите обязательную статью расходов: ");
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt("Введите обязательную статью расходов: ");
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = mony / (amount1 + amount2);

console.log('Ваша цель будет достигнута за: ', Math.ceil(mission / budgetMonth), 'месяцев.');
budgetDay = budgetMonth / 30;

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