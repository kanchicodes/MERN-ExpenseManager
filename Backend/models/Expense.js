// const mongoose = require('mongoose');


// const ExpenseSchema = new mongoose.Schema(
//     {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//         icon: { type: String },
//         category: { type: String, required: true },
//         amount: { type: Number, required: true },
//         date: { type: Date, default: Date.now },
//     },
//     { timestamps: true }
// );
// module.exports = mongoose.model('Expense', ExpenseSchema);

// import mongoose from "mongoose";

// const ExpenseSchema = new mongoose.Schema(
//     {
//         userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//         icon: { type: String },
//         category: { type: String, required: true },
//         amount: { type: Number, required: true },
//         date: { type: Date, default: Date.now },
//     },
//     { timestamps: true }
// );

// // This line is correct for hot-reload/dev environments:
// const Expense = (mongoose.models && mongoose.models.Expense) 
//     ? mongoose.models.Expense 
//     : mongoose.model('Expense', ExpenseSchema);
// module.exports = mongoose.model('Income', incomeSchema);
// export default Expense;

const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        icon: { type: String },
        category: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Expense', ExpenseSchema);