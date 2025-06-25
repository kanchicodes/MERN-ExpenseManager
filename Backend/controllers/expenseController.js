const xlsx = require('xlsx');
const Expense = require('../models/expense');

// Add expense source
exports.addExpense = async (req, res) => {

    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation check for missing fields

        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new Expense entry
        const newExpense = Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// Get all expense source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// Delete expense source
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Download Excel 
exports.downloadExpenseExel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        //prepare data for excel
        const data = expense.map((item) => ({
            category: item. category,
            amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'expense');
        xlsx.writeFile(wb, 'Expense_details.xlsx');
        res.download('Expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}