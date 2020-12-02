'use strict' 

const isNumber = function(num){ 
    return !(isNaN(parseFloat(num))) && isFinite(num); 
};

let money;

const start = function (){
    do{
    money = (prompt('Ваш месячный доход?'));
    } while(!isNumber(money)); 
    money = +money;
};

let appData = {
    income: {},
    addIncome: [],
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    deposit: false,
    expenses:{},  
    addExpenses:[], 
    target: 0,
    expensesCount: 2,
    mission: 4000000,
    asking: function(){
        let expName;
        for(let i = 0; i < appData.expensesCount; ++i){
            expName = prompt("Введите обязательную статью расходов: ");
            do{
            appData.expenses[expName] = prompt("Во сколько это обойдется: ");
            }while(!isNumber(appData.expenses[expName]));
            appData.expenses[expName] = +appData.expenses[expName];
        }
        appData.addExpenses = prompt("Перечислите ваши дополнительные расходы в месяц через запятую: ").toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    }, 
    getExpensesMonth: function(){ 
        for(let exp in appData.expenses){ 
            appData.expensesMonth += +appData.expenses[exp]; 
        } 
    }, 
    getBudget : function(){ 
        appData.budgetMonth = appData.budget - appData.expensesMonth; 
        appData.budgetDay = Math.floor(appData.budgetMonth / 30); 
    }, 
    getTargetMonth : function (){ 
        appData.target = Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome : function(){
        if(appData.budgetDay >= 1200){
            console.log('У вас высокий уровень дохода!');
        }
        else if(appData.budgetDay >= 600){
            console.log('У вас середний уровень дохода!');
        }
        else if(appData.budgetDay >= 0){
            console.log('К сожалению у вас очень низкий уровень дохода(');
        }
        else{
            console.log('Что-то пошло не так!');
        }
    },
    
    getTargetShow: function(){
        if(appData.target >= 0) console.log("Ваша цель будет достигнута за "+ appData.target +" месяцев");
        else console.log("Цель не будет достигнута");
    }
};
start();
appData.budget = money;
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log("Расходы за месяц: " + appData.expensesMonth);
appData.getTargetShow();
appData.getStatusIncome();

console.log("Наша программа включает в себя данные:");
for(let item in appData){
    console.log(appData[item]);
}
