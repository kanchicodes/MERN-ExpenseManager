// import React, { useState } from "react";
// import Input from "../Inputs/input";
// import EmogiPickerPopup from "../EmogiPickerPopup";

// const AddIncomeForm = ({ onAddIncome }) => {
//     const [income, setIncome] = useState({
//         source: "",
//         amount: "",
//         date: "",
//         icon: "",
//     });

//     const handleChange = (key, value) => setIncome({ ...income, [key]: value });

//     const handleSubmit = () => {
//         // Simple validation
//         if (!income.source || !income.amount || !income.date) {
//             alert("Please fill all required fields.");
//             return;
//         }
//         onAddIncome(income);
//         // Optionally reset the form
//         setIncome({
//             source: "",
//             amount: "",
//             date: "",
//             icon: "",
//         });
//     };

//     return (
//         <div>
//             <EmogiPickerPopup
//                 icon={income.icon}
//                 onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//             />
//             <Input
//                 value={income.source}
//                 onChange={({ target }) => handleChange("source", target.value)}
//                 label="Income Source"
//                 placeholder="Freelance, Salary, etc."
//                 type="text"
//             />
//             <Input
//                 value={income.amount}
//                 onChange={({ target }) => handleChange("amount", target.value)}
//                 label="Amount"
//                 placeholder=""
//                 type="number"
//             />
//             <Input
//                 value={income.date}
//                 onChange={({ target }) => handleChange("date", target.value)}
//                 label="Date"
//                 placeholder=""
//                 type="date"
//             />
//             <div className="flex justify-end mt-6">
//                 <button
//                     type="button"
//                     className="add-btn add-btn-fill"
//                     onClick={handleSubmit}
//                 >
//                     Add Income
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AddIncomeForm;

// File: MERN-ExpenseManager/Frontend/expense-tracker/src/components/Income/AddIncomeForm.jsx
import React, { useState } from "react";
import Input from "../Inputs/input";
import EmogiPickerPopup from "../EmogiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
        // Clear error for the field as user types
        if (errors[key]) {
            setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!income.source.trim()) {
            newErrors.source = "Income source is required.";
        }
        if (!income.amount || isNaN(income.amount) || parseFloat(income.amount) <= 0) {
            newErrors.amount = "Amount must be a positive number.";
        }
        if (!income.date) {
            newErrors.date = "Date is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onAddIncome(income);
            // Optionally reset the form
            setIncome({
                source: "",
                amount: "",
                date: "",
                icon: "",
            });
            setErrors({}); // Clear errors on successful submission
        }
    };

    return (
        <div>
            <EmogiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Freelance, Salary, etc."
                type="text"
                error={errors.source} // Pass error prop to Input component
            />
            {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
                error={errors.amount} // Pass error prop to Input component
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
                error={errors.date} // Pass error prop to Input component
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={handleSubmit}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
