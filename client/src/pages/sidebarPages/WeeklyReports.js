import React from 'react';
import Chart from 'chart.js'; 
import '../../assets/css/WeeklyReportsPage.css'; 

const WeeklyReportsPage = () => {

  const reportData = {
    absences: {
      transportEmployeeAbsences: 10,
      driverAbsences: 5,
    },
    complaints: 3,
    trafficJams: [
      { route: 'Route 1', count: 2 },
      { route: 'Route 2', count: 1 },
    ],
    systemPerformance: 'Good',

  };
  const generateCharts = () => {
    const trafficJamsChart = new Chart(document.getElementById('trafficJamsChart'), {
      type: 'bar',
      data: {
        labels: reportData.trafficJams.map(item => item.route),
        datasets: [{
          label: 'Traffic Jams Count',
          data: reportData.trafficJams.map(item => item.count),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


    return trafficJamsChart;
  };

  React.useEffect(() => {
    const charts = generateCharts();
    return () => {
      charts.destroy(); 
    };
  }, []); 

  return (
    <div className="weekly-reports-container">
      <h2>Review Weekly Reports Page</h2>
      <div className="report-section">
        <h3>Traffic Jams</h3>
        <canvas id="trafficJamsChart"></canvas>
      </div>
      {/* Add more sections for additional report data */}
    </div>
  );
};

export default WeeklyReportsPage;
