
function TransactionList({ transactions, onDeleteTransaction }) {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

   
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    
    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            onDeleteTransaction(id);
        }
    };

    
    if (transactions.length === 0) {
        return (
            <div className="transactions-card">
                <h2>Transaction History</h2>
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <p>No transactions yet. Add your first transaction above!</p>
                </div>
            </div>
        );
    }

    
    const sortedTransactions = [...transactions].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className="transactions-card">
            <h2>Transaction History ({transactions.length})</h2>
            <ul className="transaction-list">
                {sortedTransactions.map(transaction => (
                    <li
                        key={transaction.id}
                        className={`transaction-item ${transaction.type}`}
                    >
                        <div className="transaction-info">
                            <div className="transaction-title">{transaction.title}</div>
                            <div className="transaction-details">
                                <span className="transaction-category">{transaction.category}</span>
                                <span className="transaction-date">{formatDate(transaction.date)}</span>
                            </div>
                        </div>

                        <div className="transaction-actions">
                            <span className={`transaction-amount ${transaction.type}`}>
                                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </span>
                            <button
                                onClick={() => handleDelete(transaction.id, transaction.title)}
                                className="btn btn-danger btn-sm"
                                aria-label="Delete transaction"
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList;
