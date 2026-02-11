import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';


function ExpenseChart({ transactions }) {
    
    const expenses = transactions.filter(t => t.type === 'expense');

    
    if (expenses.length === 0) {
        return (
            <div className="chart-card">
                <h2>Expense Breakdown</h2>
                <div className="empty-state">
                    <div className="empty-state-icon">📊</div>
                    <p>No expense data to display. Add some expenses to see the breakdown!</p>
                </div>
            </div>
        );
    }

   
    const categoryTotals = expenses.reduce((acc, transaction) => {
        const category = transaction.category;
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
    }, {});

    
    const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
        name: category,
        value: amount
    }));

    
    chartData.sort((a, b) => b.value - a.value);

    
    const COLORS = [
        '#6366f1',  
        '#8b5cf6', 
        '#ec4899', 
        '#f59e0b', 
        '#10b981', 
        '#3b82f6', 
        '#ef4444', 
        '#14b8a6'  
    ];

   
    const renderLabel = (entry) => {
        const percent = ((entry.value / expenses.reduce((sum, t) => sum + t.amount, 0)) * 100).toFixed(1);
        return `${percent}%`;
    };

    
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

   
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'white',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].name}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#6366f1' }}>
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-card">
            <h2>Expense Breakdown by Category</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry) => `${value}: ${formatCurrency(entry.payload.value)}`}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ExpenseChart;
