
const STORAGE_KEY = 'expense_tracker_transactions';


export const loadTransactions = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading transactions from localStorage:', error);
        return [];
    }
};


export const saveTransactions = (transactions) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error('Error saving transactions to localStorage:', error);
    }
};


export const clearTransactions = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing transactions from localStorage:', error);
    }
};
