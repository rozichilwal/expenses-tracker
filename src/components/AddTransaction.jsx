import { useState } from 'react';


function AddTransaction({ onAddTransaction }) {
    
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0], 
        type: 'expense'
    });

    
    const expenseCategories = [
        'Food & Dining',
        'Transportation',
        'Shopping',
        'Entertainment',
        'Bills & Utilities',
        'Healthcare',
        'Education',
        'Other'
    ];

    const incomeCategories = [
        'Salary',
        'Freelance',
        'Business',
        'Investment',
        'Gift',
        'Other'
    ];

    const categories = formData.type === 'expense' ? expenseCategories : incomeCategories;

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            
            ...(name === 'type' && { category: '' })
        }));
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Please enter a title');
            return;
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!formData.category) {
            alert('Please select a category');
            return;
        }

        
        const transaction = {
            id: Date.now(), 
            title: formData.title.trim(),
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date,
            type: formData.type
        };

        
        onAddTransaction(transaction);

       
        setFormData({
            title: '',
            amount: '',
            category: '',
            date: new Date().toISOString().split('T')[0],
            type: 'expense'
        });
    };

    return (
        <div className="form-card">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Transaction Type */}
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Grocery Shopping"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div className="form-group">
                        <label htmlFor="amount">Amount (₹)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button
                        type="submit"
                        className={`btn ${formData.type === 'income' ? 'btn-success' : 'btn-danger'}`}
                    >
                        {formData.type === 'income' ? '➕ Add Income' : '➖ Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTransaction;
