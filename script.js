let money = 30000,
incomy = 'Фриланс',
addExpenses = 'интернет, такси, коммуналка',
deposit = false,
mission = 4000000,
period = 6;

console.log(typeof money);
console.log(typeof incomy);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев.");
console.log('Цель: заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(' '));

let budgetDay = money / 30;
console.log(budgetDay);

money = +(prompt('Ваш месячный доход?', '50000'));
addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ");
deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt("Введите обязательную статью расходов: ", 'Коммуналка');
const amount1 = +prompt('Во сколько это обойдется?', '5000');
const expenses2 = prompt("Введите обязательную статью расходов: ", 'Транспорт');
const amount2 = +prompt('Во сколько это обойдется?', '10000');

let budgetMonth = money - (amount1 + amount2);
console.log("Бюджет на месяц: " + budgetMonth);

console.log('Ваша цель будет достигнута за: ', Math.ceil(mission / budgetMonth), 'месяцев.');

budgetDay = budgetMonth / 30;
console.log("Дневной бюджет: " + Math.floor(budgetDay));

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
