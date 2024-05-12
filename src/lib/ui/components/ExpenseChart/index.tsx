"use client"

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ExpenseChart = ({ data }: any) => {
  const months = data.reduce((acc: any, expense: any) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const categories = data.reduce((acc: any, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  // Data for Total Expenses per Month chart
  const totalExpensesPerMonthData = {
    labels: Object.keys(months),
    datasets: [
      {
        label: 'Total Expenses per Month',
        data: Object.values(months),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Data for Spending Breakdown by Category chart
  const spendingBreakdownByCategoryData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Spending Breakdown by Category',
        data: Object.values(categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <div>
        <h2>Total Expenses per Month</h2>
        <Bar data={totalExpensesPerMonthData} />
      </div>
      <div className="mt-10">
        <h2>Spending Breakdown by Category</h2>
        <Pie data={spendingBreakdownByCategoryData} />
      </div>
    </div>
  );
};

export default ExpenseChart;
