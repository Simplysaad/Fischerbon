import React from 'react';

import { ChartBar } from 'lucide-react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Lessons Completed',
      data: [12, 0, 33, 7.4, 10, 1],
      borderColor: '#30C10B',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 5,
      pointBackgroundColor: '#30C10B',
      pointBorderColor: '#30C10B17',
    },
    {
      label: 'Quizzes Passed',
      data: [2, 9.2, 2, 0, 0.6, 2],
      borderColor: '#3c97d0',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 5,
      pointBackgroundColor: '#3c97d0',
      pointBorderColor: '#3B82F617',
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#69757C',
        padding: 16,
        font: {
          size: window.innerWidth > 768 ? 12 : 10,
        },
      },
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#374151',
      bodyColor: '#111827',
      padding: 10,
      borderColor: '#E5E7EB',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#6B7280',
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#6B7280',
        stepSize: 5,
      },
      grid: {
        color: '#E5E7EB',
        borderDash: [4, 4],
      },
    },
  },
};

const DashboardChart = () => {
  // useEffect() to check authentication status
  // GET /auth/status
  // success: bool
  // message: string
  return (
    <>
      <div className="bg-[#F1F2F3] font-serif md:p-5 p-3 rounded-lg shadow-md mb-5">
        <div className="flex items-center space-x-2 mb-3">
          <ChartBar size="24" color="#111827" />
          <div>
            <h4 className="text-[#111827]">Progress Overview</h4>
            <p className="text-[#6B7280] text-sm">
              {`You're making progress, keep it up!`}
            </p>
          </div>
        </div>

        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default DashboardChart;
