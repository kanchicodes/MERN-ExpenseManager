import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense }
    ].filter(item => item.amount > 0);
    // return (
    //     <div className="card">
    //         <div className="flex items-center justify-between">
    //             <h5 className="text-lg">Finance Overview</h5>
    //         </div>
    //         <CustomPieChart
    //             data={balanceData}
    //             label="Total Balance"
    //             totalAmount={`$${totalBalance}`}
    //             colors={COLORS}
    //             showTextAnchor
    //         />
    //     </div>
    // );

    return (
    <div className="card flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
            <h5 className="text-lg font-semibold text-gray-800">Finance Overview</h5>
        </div>
        <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
);
};
export default FinanceOverview;