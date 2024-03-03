import React, { useState, useEffect } from 'react';
import '../../assets/css/WeeklyReportsPage.css'; 
import { Tab } from 'react-bootstrap';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('your-backend-api-endpoint');
      const data = await response.json();
      setReports(data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Function to handle click on a report
  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  return (
    <div className="reports-container">
      <h2>Reports Page</h2>
      <ul>
        {reports.map((report, index) => (
          <li key={index} onClick={() => handleReportClick(report)}>
            {report.title}
          </li>
        ))}
      </ul>
      {/* Display selected report description */}
      {selectedReport && (
        <div className="selected-report">
          <h3>Selected Report</h3>
          <p>Title: {selectedReport.title}</p>
          <p>Description: {selectedReport.description}</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
