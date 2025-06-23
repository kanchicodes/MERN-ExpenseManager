const xlsx = require('xlsx');
const Income = require('../models/Income');

// Add income source
exports.addIncome = async (req, res) => {

    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation check for missing fields

        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new income entry
        const newIncome = Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// Get all incomes source
exports.getAllIncomes = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


// Delete income source
exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: 'Income deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


// Download Excel 
exports.downloadIncomeExel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        //prepare data for excel
        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}