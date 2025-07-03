import React from "react";
import CustomTooltip from "../Charts/CustomTooltip"
import CustomLegend from "../Charts/CustomLegend"
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors = COLORS,
    showTextAnchor,
}) => {
    console.log("Pie chart data:", data);
    return <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={55}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip content={CustomTooltip}/>
            <Legend content={CustomLegend}/>

            {showTextAnchor && (
                <>
                    <text
                        x="50%"
                        y="50%"
                        dy="-25"
                        textAnchor="middle"
                        fill="#666"
                        fontSize="14px"
                    >
                        {label}
                    </text>
                    <text
                        x="50%"
                        y="50%"
                        dy="8"
                        textAnchor="middle"
                        fill="#333"
                        fontSize="24px"
                        fontWeight="semi-bold"
                    >
                        {totalAmount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
};

export default CustomPieChart;