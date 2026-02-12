import { useState, useEffect } from 'react';
import Summary from './components/Summary';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import { loadTransactions, saveTransactions } from './utils/localStorage';


function App() {
    
    const [transactions, setTransactions] = useState([]);

    
    useEffect(() => {
        const savedTransactions = loadTransactions();
        setTransactions(savedTransactions);
    }, []);

    
    useEffect(() => {
        saveTransactions(transactions);
    }, [transactions]);

    
    const handleAddTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    
    const handleDeleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    
    const calculateIncome = () => {
        return transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    };

    
    const calculateExpenses = () => {
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    };

    
    const calculateBalance = () => {
        return calculateIncome() - calculateExpenses();
    };

    const totalIncome = calculateIncome();
    const totalExpenses = calculateExpenses();
    const balance = calculateBalance();

    return (
        <div className="container">
            
            <header className="app-header">
                <h1>💰 Expense Tracker</h1>
                <p>Track your income and expenses with ease</p>
            </header>

           
            <Summary
                income={totalIncome}
                expenses={totalExpenses}
                balance={balance}
            />

            
            <AddTransaction onAddTransaction={handleAddTransaction} />

            
            <ExpenseChart transactions={transactions} />

            
            <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
            />
        </div>
    );
}

export default App;
