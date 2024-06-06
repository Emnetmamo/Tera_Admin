import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import Chart from 'chart.js/auto'; // Import Chart.js
import { Bar } from 'react-chartjs-2';
import domtoimage from 'dom-to-image-more';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample data for reports
const sampleReports = [
  {
    id: 1,
    date: '2024-06-01',
    driver: 'John Doe',
    licensePlate: 'ABC123',
    terminal: 'Terminal A',
    cityDistrict: 'District X',
    reportedBy: 'Jane Smith',
    timeReported: '09:00 AM',
    attendance: 'Present',
    warning: 'No',
    punishment: 'None',
  },
  {
    id: 2,
    date: '2024-06-01',
    driver: 'Alice Johnson',
    licensePlate: 'XYZ789',
    terminal: 'Terminal B',
    cityDistrict: 'District Y',
    reportedBy: 'Bob Brown',
    timeReported: '10:30 AM',
    attendance: 'Absent',
    warning: 'Yes',
    punishment: 'Fine',
  },
  {
    id: 3,
    date: '2024-06-02',
    driver: 'Eva Lee',
    licensePlate: 'DEF456',
    terminal: 'Terminal C',
    cityDistrict: 'District Z',
    reportedBy: 'Sam Wilson',
    timeReported: '11:45 AM',
    attendance: 'Present',
    warning: 'No',
    punishment: 'None',
  },
];

const DailyReport = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulating fetching reports from API
    setReports(sampleReports);
  }, []);

  // Organize terminals by district
  const districtTerminalMap = {};

  // Extract unique districts and terminals
  const uniqueDistricts = Object.keys(districtTerminalMap);

  const handleDayChange = (date) => {
    setSelectedDay(date);
    setShowGraph(false);
  };

  const handleTerminalChange = (selectedOption) => {
    setSelectedTerminal(selectedOption);
    setShowGraph(false);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedTerminal(null); // Reset selected terminal when district changes
    setShowGraph(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowGraph(false); // Close graph when closing modal
    setModalKey((prevKey) => prevKey + 1);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.date === selectedDay.toISOString().split('T')[0] &&
      (!selectedTerminal || report.terminal === selectedTerminal.value) &&
      (!selectedDistrict || report.cityDistrict === selectedDistrict.value)
  );

  const data = {
    labels: filteredReports.map(
      (report) =>
        `${report.licensePlate}\n${report.cityDistrict}\n${report.terminal}\n${report.reportedBy}`
    ),
    datasets: [
      {
        label: 'Attendance',
        data: filteredReports.map((report) =>
          report.attendance === 'Present' ? 1 : 0
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Warnings Sent',
        data: filteredReports.map((report) =>
          report.warning === 'Yes' ? 1 : 0
        ),
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: 'Punishments',
        data: filteredReports.map((report) =>
          report.punishment !== 'None' ? 1 : 0
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const handleDownloadGraph = () => {
    if (showGraph) {
      const node = document.getElementById('daily-report-graph');
      const title = document.createElement('h4');
      const district = selectedDistrict ? selectedDistrict.label : 'All Districts';
      const terminal = selectedTerminal ? selectedTerminal.label : 'All Terminals';
      title.textContent =       `${district} and ${terminal} - ${selectedDay.toLocaleDateString()}`
      node.insertBefore(title, node.firstChild);

      domtoimage
        .toJpeg(node, { bgcolor: '#ffffff' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `daily_report_${selectedDay.toISOString()}.jpeg`;
          link.click();
          node.removeChild(title); // Remove title after download
        })
        .catch((error) => {
          console.error('Error generating image:', error);
          // Handle error
          node.removeChild(title); // Remove title on error
        });
    }
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px', display: 'flex' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select Day:</label>
          <br />
          <DatePicker
            selected={selectedDay}
            onChange={handleDayChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select City District:</label>
          <Select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            options={uniqueDistricts.map((district) => ({
              value: district,
              label: district,
            }))}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Select Terminal:</label>
          <Select
            value={selectedTerminal}
            onChange={handleTerminalChange}
            options={
              selectedDistrict
                ? Object.keys(districtTerminalMap[selectedDistrict.value] || {}).map(
                    (terminal) => ({
                      value: terminal,
                      label: terminal,
                    })
                  )
                : []
            }
          />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={handleShowGraph} style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }}>
          See Daily Report On Graph
        </Button>
      </div>
      <Table striped bordered hover style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Driver</th>
            <th>License Plate</th>
            <th>Terminal</th>
            <th>City District</th>
            <th>Reported by</th>
            <th>Time Reported</th>
            <th>Attendance</th>
            <th>Warning Sent</th>
            <th>Punishment</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id}>
              <td>{report.driver}</td>
              <td>{report.licensePlate}</td>
              <td>{report.terminal}</td>
              <td>{report.cityDistrict}</td>
              <td>{report.reportedBy}</td>
              <td>{report.timeReported}</td>
              <td>{report.attendance}</td>
              <td>{report.warning}</td>
              <td>{report.punishment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal key={modalKey} show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Report Graph</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'white' }}>
          <h4 style={{ textAlign: 'center', marginBottom: '10px' }}>
            {`Daily report of ${
              selectedDistrict ? selectedDistrict.label : 'All Districts'
            } and ${
              selectedTerminal ? selectedTerminal.label : 'All Terminals'
            } - ${selectedDay.toLocaleDateString()}`}
          </h4>
          {showGraph && (
            <div id="daily-report-graph">
              <canvas id="myChart" width="400" height="400"></canvas> {/* Place canvas element for the chart */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownloadGraph}>
            Download Graph
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DailyReport;

