// import React, { useState } from "react";
// import Input from "../Inputs/input";
// import EmogiPickerPopup from "../EmogiPickerPopup";

// const AddExpenseForm = ({ onAddExpense }) => {
//     const [expense, setExpense] = useState({
//         category: "",
//         amount: "",
//         date: "",
//         icon: "",
//     });
//     const [error, setError] = useState(""); // State to hold validation error message

//     const handleChange = (key, value) => {
//         setExpense({ ...expense, [key]: value });
//         if (error) setError(""); // Clear error when user starts typing again
//     };

//     const handleAddExpense = () => {
//         const amountValue = parseFloat(expense.amount);

//         if (isNaN(amountValue) || amountValue <= 0) {
//             setError("Amount must be a valid number greater than 0.");
//             return; // Stop the function if validation fails
//         }

//         setError(""); // Clear any previous errors
//         onAddExpense(expense);
//     };

//     return (
//         <div>
//             <EmogiPickerPopup
//                 icon={expense.icon}
//                 onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//             />
//             <Input
//                 value={expense.category}
//                 onChange={({ target }) => handleChange("category", target.value)}
//                 label="Category"
//                 placeholder="Rent, Groceries, etc."
//                 type="text"
//             />
//             <Input
//                 value={expense.amount}
//                 onChange={({ target }) => handleChange("amount", target.value)}
//                 label="Amount"
//                 placeholder=""
//                 type="number"
//             />
//             <Input
//                 value={expense.date}
//                 onChange={({ target }) => handleChange("date", target.value)}
//                 label="Date"
//                 placeholder=""
//                 type="date"
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error message */}
//             <div className="flex justify-end mt-6">
//                 <button
//                     type="button"
//                     className="add-btn add-btn-fill"
//                     onClick={handleAddExpense} // Call the new handler
//                 >
//                     Add Expense
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddExpenseForm;


import React, { useState } from "react";
import Input from "../Inputs/input";
import EmogiPickerPopup from "../EmogiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!expense.category.trim()) {
            newErrors.category = "Category is required.";
        }
        if (
            !expense.amount ||
            isNaN(expense.amount) ||
            parseFloat(expense.amount) <= 0
        ) {
            newErrors.amount = "Amount must be a valid number greater than 0.";
        }
        if (!expense.date) {
            newErrors.date = "Date is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length == 0;
    };

    const handleAddExpense = () => {
        if (validateForm()) {
            onAddExpense(expense);
            // Optional: Reset form
            setExpense({
                category: "",
                amount: "",
                date: "",
                icon: "",
            });
            setErrors({});
        }
    };

    return (
        <div>
            <EmogiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc."
                type="text"
                error={errors.category}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
                error={errors.amount}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
                error={errors.date}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={handleAddExpense}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
