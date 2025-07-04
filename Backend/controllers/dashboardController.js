// const Income = require('../models/Income');
// const Expense = require('../models/Expense');
// const { isValidObjectId, Types } = require('mongoose');


// // Get dashboard data
// exports.getDashboardData = async (req, res) => {

//     try {

//         const userId = req.user._id;
//         const userObjectId = new Types.ObjectId(String(userId));


//         // Get total income
//         const totalIncome = await Income.aggregate([
//             { $match: { userId: userObjectId } },
//             { $group: { _id: null, total: { $sum: '$amount' } } }
//         ]);

//         console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });


//         // Get total expense
//     const totalExpense = await Expense.aggregate([
//     { $match: { userId: userObjectId } }, 
//     { $group: { _id: null, total: { $sum: '$amount' } } }
// ]);


//         // Get  income transactions in the last 60 days

//         const last60DaysIncomeTransactions = await Income.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });


//         //Get total imcome in the last 60 days
//         const incomeLast60Days = last60DaysIncomeTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount, 0);


//         // Get expense transactions in the last 30 days
//         const last30DaysExpenseTransactions = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         // Get total expense in the last 30 days
//         const expenseLast30Days = last30DaysExpenseTransactions.reduce(
//             (sum, transaction) => sum + transaction.amount, 0);

//         // Fetch the last 5 income transactions (income + expense)
//         const lastTransactions = [
//             ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({
//                     ...txn.toObject(),
//                     type: "income",
//                 })
//             ),
//             ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
//                 (txn) => ({
//                     ...txn.toObject(),
//                     type: "expense",
//                 })
//             ),
//         ].sort((a, b) => b.date - a.date);

//         //Final Response
//         res.json({
//             totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

//             totalIncome: totalIncome[0]?.total || 0,
//             totalExpense: totalExpense[0]?.total || 0,

//             last30DaysExpenses:
//             {
//                 total: expenseLast30Days,
//                 transactions: last30DaysExpenseTransactions,
//             },

//             last60DaysIncome: {
//                 total: incomeLast60Days,
//                 transactions: last60DaysIncomeTransactions,
//             },
//             recentTransactions: lastTransactions,
//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Server Error', error });

//     }
// }

const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Get total income
        const totalIncomeAgg = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalIncome = totalIncomeAgg[0]?.total || 0;

        // Get total expense
        const totalExpenseAgg = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpense = totalExpenseAgg[0]?.total || 0;

        // Last 60 days income
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: sixtyDaysAgo },
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);

        // Last 30 days expense
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: thirtyDaysAgo },
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0);

        // Last 5 transactions (income + expense)
        const lastIncomeTxns = await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);
        const lastExpenseTxns = await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5);

        const lastTransactions = [
            ...lastIncomeTxns.map(txn => ({ ...txn.toObject(), type: "income" })),
            ...lastExpenseTxns.map(txn => ({ ...txn.toObject(), type: "expense" })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        // Final Response
        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};