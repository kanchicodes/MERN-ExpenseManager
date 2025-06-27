import React from "react";
import { LuArrowRight } from "react-icons/lu";
//import TransactinInfoCard from "../TransactionInfoCard";
import TransactinInfoCard from "../Cards/TransactinInfoCard";

const RecentIncome = ({ transactins, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactins?.slice(0, 5)?.map((item) => (

                    <TransactinInfoCard
                        key={item._id}
                        title={item.category}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type="income"
                        hiddenDeleteBtn
                    />
                ))}
            </div>

        </div>
    )
};

export default RecentIncome;