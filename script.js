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