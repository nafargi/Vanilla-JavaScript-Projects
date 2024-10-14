const form = document.querySelector('.add');
const incomeList = document.querySelector('.income-list');
const expenseList = document.querySelector('.expense-list');
 
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

let transactions = localStorage.getItem('transactions') !== null ? JSON.parse(localStorage.getItem('transactions')) : [];


function generateTemplate(id,source,amount,time){
  return `<li data-id="${id}">
                <p>
                    <span>${source}</span>
                    <span id="time">${time}</span>
                </p>
                $<span>${Math.abs(amount)}</span>
                <i class="bi bi-trash delete"></i>
            </li> `;
};


function updateStatistics(){
     const totalIncome = transactions
                         .filter(transactions => transactions.amount > 0)
                         .reduce((total,transaction) => total += transaction.amount,0);

     const totalExpense = transactions
                         .filter(transactions => transactions.amount <  0)
                         .reduce((total,transaction) => total += Math.abs(transaction.amount),0);
      balance.textContent = totalIncome - totalExpense;
     income.textContent = totalIncome;
     expense.textContent = totalExpense;
};


function addTransactionDOM(id, source, amount, time){
   if (amount >= 0){
        incomeList.innerHTML += generateTemplate(id,source,amount,time);
   }else{
        expenseList.innerHTML += generateTemplate(id,source,amount,time);
   }
}
function addTransactions(source, amount){
    const time =new Date();
    const transaction = {
        id: Math.floor(Math.random() * 10),
        source,
        amount,
        time :`${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
    }
    transactions.push(transaction);
    localStorage.setItem('transactions',JSON.stringify(transactions));
    addTransactionDOM(transaction.id, transaction.source, transaction.amount,transaction.time);
    updateStatistics();
}

form.addEventListener('submit',event =>{
    event.preventDefault()
    addTransactions(form.source.value.trim(), Number(form.amount.value));
    form.reset();
    updateStatistics();
}
);


function getTransaction(){
    transactions.forEach(transaction => {
        if(transaction.amount > 0){
            incomeList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        } else {
            expenseList.innerHTML += generateTemplate(transaction.id, transaction.source, transaction.amount, transaction.time);
        }
    });
};

function deleteTransaction(id){
    transactions = transactions.filter(transaction => {
        return transaction.id !== id ;
 });
 localStorage.setItem('transactions',JSON.stringify(transactions));
 updateStatistics();
};

incomeList.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
       event.target.parentElement.remove();
       deleteTransaction(Number(event.target.parentElement.dataset.id));
    }
});

expenseList.addEventListener('click', event => {
    if(event.target.classList.contains('delete')){
       event.target.parentElement.remove();
       deleteTransaction(Number(event.target.parentElement.dataset.id));
    }
});

function init(){
    getTransaction();
    updateStatistics()
};

init();
