
function Summary({ income, expenses, balance }) {
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="summary-grid">
            
            <div className="summary-card" style={{ '--card-color': 'var(--color-success)' }}>
                <div className="summary-card-header">
                    <span className="summary-card-title">Total Income</span>
                    <span className="summary-card-icon">💰</span>
                </div>
                <div className="summary-card-amount">
                    {formatCurrency(income)}
                </div>
            </div>

            
            <div className="summary-card" style={{ '--card-color': 'var(--color-danger)' }}>
                <div className="summary-card-header">
                    <span className="summary-card-title">Total Expenses</span>
                    <span className="summary-card-icon">💸</span>
                </div>
                <div className="summary-card-amount">
                    {formatCurrency(expenses)}
                </div>
            </div>

            
            <div className="summary-card" style={{ '--card-color': balance >= 0 ? 'var(--color-primary)' : 'var(--color-warning)' }}>
                <div className="summary-card-header">
                    <span className="summary-card-title">Current Balance</span>
                    <span className="summary-card-icon">{balance >= 0 ? '💵' : '⚠️'}</span>
                </div>
                <div className="summary-card-amount">
                    {formatCurrency(balance)}
                </div>
            </div>
        </div>
    );
}

export default Summary;
