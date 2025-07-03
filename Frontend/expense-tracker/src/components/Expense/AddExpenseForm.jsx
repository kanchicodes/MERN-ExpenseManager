import React from "react";
import Input from "../Inputs//input";
import EmogiPickerPopup from "../EmogiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
    const [income, setIncome] = useState({
            source: "",
            amount: "",
            date: "",
            icon: "",
        });
    
        const handleChange = (key, value) => setIncome({ ...income, [key]: value });
        return (  <div>
            <EmogiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}

            />
            <Input
                value={income.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="category"
                placeholder="Rent, Groceries, etc."
                type="text"
            />
            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(income)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
};

export default AddExpenseForm;