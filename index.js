var landingPage = document.querySelector('.landing-page');
var calculatorPage = document.querySelector('.calculator-page');
var startBtn = document.getElementById('start-btn');
var backBtn = document.getElementById('back-btn');
var addTransactionBtn = document.getElementById('add-transaction-btn');
var calculateBtn = document.getElementById('calculate-btn');
var initialValueInput = document.getElementById('initial-value');
var transactionValueInput = document.getElementById('transaction-value');
var transactionList = document.getElementById('transaction-list');
var resultsSection = document.getElementById('results');
// Store transactions
var transactions = getTransactions();
if (!localStorage.getItem('transactions'))
    localStorage.setItem('transactions', JSON.stringify(transactions));
function setTransactions() {
    var JSONTransactions = JSON.stringify(transactions);
    localStorage.setItem('transactions', JSONTransactions);
}
function getTransactions() {
    var transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
}
function clearTransations() {
    transactions = [];
    setTransactions();
    console.log(transactions.length > 0 ? transactions : 'No transactions recorded');
}
// Navigation
startBtn.addEventListener('click', function () {
    landingPage.style.display = 'none';
    calculatorPage.style.display = 'block';
});
backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    calculatorPage.style.display = 'none';
    landingPage.style.display = 'block';
    // Reset calculator
    //resetCalculator();
});
// Add transaction
updateTransactionList();
addTransactionBtn.addEventListener('click', function () {
    var value = transactionValueInput.value;
    transactions.push(eval(value));
    updateTransactionList();
    setTransactions();
    //transactionValueInput.value = '';
});
// Update transaction list display
function updateTransactionList() {
    if (transactions.length === 0) {
        transactionList.innerHTML = '<div style="text-align: center; color: #999; padding: 1rem;">No transactions added yet</div>';
        return;
    }
    transactionList.innerHTML = '';
    transactions.forEach(function (transaction, index) {
        var item = document.createElement('div');
        item.className = 'transaction-item';
        item.innerHTML = "\n                    <span>Transaction ".concat(index + 1, "</span>\n                    <span>D").concat(transaction.toFixed(2), "</span>\n                ");
        transactionList.appendChild(item);
    });
}
// Calculate results
calculateBtn.addEventListener('click', function () {
    var initialValue = parseFloat(initialValueInput.value);
    if (isNaN(initialValue) || initialValue <= 0) {
        alert('Please enter a valid initial value');
        return;
    }
    if (transactions.length === 0) {
        alert('Please add at least one transaction');
        return;
    }
    // Calculate total transactions
    var totalTransactions = transactions.reduce(function (sum, value) { return sum + value; }, 0);
    // Updated logic: Transaction amounts go into savings, remainder is change
    var change = initialValue - eval(transactionValueInput.value);
    var savings = totalTransactions;
    // Display results
    document.getElementById('result-initial').textContent = "D".concat(initialValue.toFixed(2));
    document.getElementById('result-transactions').textContent = "D".concat(totalTransactions.toFixed(2));
    document.getElementById('result-change').textContent = "D".concat(change.toFixed(2));
    document.getElementById('result-savings').textContent = "D".concat(savings.toFixed(2));
    resultsSection.style.display = 'block';
    initialValueInput.value = '';
    transactionValueInput.value = '';
});
// Reset calculator
function resetCalculator() {
    initialValueInput.value = '';
    transactionValueInput.value = '';
    transactions = [];
    updateTransactionList();
    resultsSection.style.display = 'none';
}
var totalTransactions = transactions.reduce(function (sum, value) { return sum + value; }, 0);
//document.querySelector('.savings-value')!.textContent = `D${totalTransactions.toFixed(2)}`;
//console.log(totalTransactions);
