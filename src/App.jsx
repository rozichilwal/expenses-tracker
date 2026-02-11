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

    /**
     * Add a new transaction
     * @param {Object} transaction - Transaction object to add
     */
    const handleAddTransaction = (transaction) => {
        setTransactions(prev => [...prev, transaction]);
    };

    /**
     * Delete a transaction by ID
     * @param {number} id - Transaction ID to delete
     */
    const handleDeleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    /**
     * Calculate total income
     * @returns {number} Total income amount
     */
    const calculateIncome = () => {
        return transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    };

    /**
     * Calculate total expenses
     * @returns {number} Total expenses amount
     */
    const calculateExpenses = () => {
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    };

    /**
     * Calculate current balance (income - expenses)
     * @returns {number} Current balance
     */
    const calculateBalance = () => {
        return calculateIncome() - calculateExpenses();
    };

    const totalIncome = calculateIncome();
    const totalExpenses = calculateExpenses();
    const balance = calculateBalance();

    return (
        <div className="container">
            {/* App Header */}
            <header className="app-header">
                <h1>💰 Expense Tracker</h1>
                <p>Track your income and expenses with ease</p>
            </header>

            {/* Summary Cards */}
            <Summary
                income={totalIncome}
                expenses={totalExpenses}
                balance={balance}
            />

            {/* Add Transaction Form */}
            <AddTransaction onAddTransaction={handleAddTransaction} />

            {/* Expense Chart */}
            <ExpenseChart transactions={transactions} />

            {/* Transaction List */}
            <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
            />
        </div>
    );
}

export default App;
