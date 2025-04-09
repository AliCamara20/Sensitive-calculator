const landingPage = document.querySelector<HTMLDivElement>('.landing-page');
        const calculatorPage = document.querySelector<HTMLDivElement>('.calculator-page');
        const startBtn = document.getElementById('start-btn') as HTMLAnchorElement;
        const backBtn = document.getElementById('back-btn') as HTMLButtonElement;
        const addTransactionBtn = document.getElementById('add-transaction-btn') as HTMLButtonElement;
        const calculateBtn = document.getElementById('calculate-btn') as HTMLButtonElement;
        const initialValueInput = document.getElementById('initial-value') as HTMLInputElement;
        const transactionValueInput = document.getElementById('transaction-value') as HTMLInputElement;
        const transactionList = document.getElementById('transaction-list') as HTMLInputElement;
        const resultsSection = document.getElementById('results') as HTMLDivElement;
        
        // Store transactions

        
        let transactions = getTransactions();

        if(!localStorage.getItem('transactions'))
          localStorage.setItem('transactions', JSON.stringify(transactions));

        function setTransactions(){
          let JSONTransactions = JSON.stringify(transactions)
          localStorage.setItem('transactions', JSONTransactions)
        }
        function getTransactions(){
          const transactions: string | null = localStorage.getItem('transactions');
          return transactions ? JSON.parse(transactions) : []
        }

        
        // Navigation
        startBtn.addEventListener('click', () => {
            landingPage!.style.display = 'none';
            calculatorPage!.style.display = 'block';
        });
        
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            calculatorPage!.style.display = 'none';
            landingPage!.style.display = 'block';
            
            // Reset calculator
            //resetCalculator();
        });
        
        // Add transaction
        updateTransactionList();
        addTransactionBtn.addEventListener('click', () => {
          const value = transactionValueInput.value;
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
            transactions.forEach((transaction:number, index: number) => {
                const item = document.createElement('div');
                item.className = 'transaction-item';
                item.innerHTML = `
                    <span>Transaction ${index + 1}</span>
                    <span>D${transaction.toFixed(2)}</span>
                `;
                transactionList.appendChild(item);
            
            });
          
        }

        // Calculate results
        calculateBtn.addEventListener('click', () => {
            const initialValue = parseFloat(initialValueInput.value);
            
            if (isNaN(initialValue) || initialValue <= 0) {
                alert('Please enter a valid initial value');
                return;
            }
            
            if (transactions.length === 0) {
                alert('Please add at least one transaction');
                return;
            }
            
            // Calculate total transactions
            const totalTransactions = transactions.reduce((sum: number, value: number) => sum + value, 0);
            
            // Updated logic: Transaction amounts go into savings, remainder is change
            const change = initialValue - eval(transactionValueInput.value); 
            const savings = totalTransactions;
            // Display results
            document.getElementById('result-initial')!.textContent = `D${initialValue.toFixed(2)}`;
            document.getElementById('result-transactions')!.textContent = `D${totalTransactions.toFixed(2)}`;
            document.getElementById('result-change')!.textContent = `D${change.toFixed(2)}`;
            document.getElementById('result-savings')!.textContent = `D${savings.toFixed(2)}`;
            
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

        function transactionDate(){
            const date  = new Date();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            
        }