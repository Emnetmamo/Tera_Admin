import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import domtoimage from 'dom-to-image-more';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyReport = () => {
  const [selectedYear, setSelectedYear] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() });
  const [selectedMonth, setSelectedMonth] = useState({ value: new Date().getMonth() + 1, label: new Date().toLocaleString('default', { month: 'long' }) });
  const chartRef = useRef(null);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleDownload = () => {
    if (chartRef.current) {
      const node = chartRef.current;
      domtoimage.toJpeg(node, { quality: 0.95, style: { backgroundColor: '#ffffff' } })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `monthly_report_${selectedMonth.label}_${selectedYear.label}.jpeg`;
          link.click();
          toast.success('Image has been downloaded successfully!');
        })
        .catch((error) => {
          console.error('Error generating image:', error);
          toast.error('Failed to download image.');
        });
    }
  };

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance',
        data: [85, 90, 80, 75],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Warnings Sent',
        data: [2, 3, 1, 4],
        fill: false,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
      {
        label: 'Punishments',
        data: [1, 0, 2, 1],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const years = [];
  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push({ value: i, label: i });
  }

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div>
      {/* <h2>Monthly Report</h2> */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select Year:</label>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            options={years}
          />
        </div>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select Month:</label>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            options={months}
          />
        </div>
        <div>
          <button onClick={handleDownload} style={{ backgroundColor: '#267789', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Download</button>
        </div>
      </div>
      <div ref={chartRef} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '5px' }}>
        <h3>Monthly Report of {selectedMonth.label}, {selectedYear.label}</h3>
        <Line data={data} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MonthlyReport;
