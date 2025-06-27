import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactinInfoCard from "../Cards/TransactinInfoCard";

const RecentTransactins = ({ transactins, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex-items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactins?.slice(0, 5)?.map((item) => (
                    <TransactinInfoCard
                        key={item.id}
                        title={item.type == "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hiddenDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
};

export default RecentTransactins;