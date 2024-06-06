import React, { useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import domtoimage from 'dom-to-image-more';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeeklyReport = () => {
  const [selectedStartOfWeek, setSelectedStartOfWeek] = useState(new Date());
  const [selectedEndOfWeek, setSelectedEndOfWeek] = useState(new Date());
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const reports = [
    {
      id: 1,
      driver: 'John Doe',
      licensePlate: 'ABC1234',
      terminal: 'Terminal 1',
      cityDistrict: 'District A',
      reportedBy: 'Alice Johnson',
      timeReported: '08:30 AM',
      attendance: 'Present',
      warning: 'No',
      punishment: 'None',
      date: '2024-04-20', // Example date before April 29
    },
    {
      id: 2,
      driver: 'Jane Smith',
      licensePlate: 'XYZ5678',
      terminal: 'Terminal 2',
      cityDistrict: 'District B',
      reportedBy: 'Bob Brown',
      timeReported: '09:15 AM',
      attendance: 'Absent',
      warning: 'Yes',
      punishment: 'Warning Letter',
      date: '2024-05-04', // Example date before April 29
    },
    // Add more report entries as needed
  ];

  const districtTerminalMap = {
    'District A': {
      'Terminal 1': ['Route 1', 'Route 2', 'Route 3'],
      'Terminal 2': ['Route A', 'Route B', 'Route C'],
    },
    'District B': {
      'Terminal 3': ['Route X', 'Route Y', 'Route Z'],
      'Terminal 4': ['Route M', 'Route N', 'Route O'],
    },
    'District C': {
      'Terminal 5': ['Route P', 'Route Q', 'Route R'],
      'Terminal 6': ['Route S', 'Route T', 'Route U'],
    },
  };

  const uniqueTerminals = [...new Set(reports.map((report) => report.terminal))];
  const uniqueDistricts = [...new Set(reports.map((report) => report.cityDistrict))];

  const handleStartOfWeekChange = (date) => {
    setSelectedStartOfWeek(getMonday(date));
    setSelectedEndOfWeek(addDays(date, 6));
    setShowGraph(false);
  };

  const handleTerminalChange = (selectedOption) => {
    setSelectedTerminal(selectedOption);
    setShowGraph(false);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
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
      new Date(report.date) >= selectedStartOfWeek &&
      new Date(report.date) <= selectedEndOfWeek &&
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
        data: filteredReports.map((report) => (report.attendance === 'Present' ? 1 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Warnings Sent',
        data: filteredReports.map((report) => (report.warning === 'Yes' ? 1 : 0)),
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: 'Punishments',
        data: filteredReports.map((report) => (report.punishment !== 'None' ? 1 : 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const handleDownloadGraph = () => {
    if (showGraph) {
      const node = document.getElementById('weekly-report-graph');
      const title = document.createElement('h4');
      const district = selectedDistrict ? selectedDistrict.label : 'All Districts';
      const terminal = selectedTerminal ? selectedTerminal.label : 'All Terminals';
      title.textContent = `Weekly report of ${district} and ${terminal} - ${selectedStartOfWeek.toLocaleDateString()} to ${selectedEndOfWeek.toLocaleDateString()}`;
      node.insertBefore(title, node.firstChild);

      domtoimage
        .toJpeg(node, { bgcolor: '#ffffff' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `weekly_report_${selectedStartOfWeek.toISOString()}.jpeg`;
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

  // Function to get the Monday of a given date
  const getMonday = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
  };

  // Function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px', display: 'flex' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select Start of Week:</label>
          <br />
          <DatePicker
            selected={selectedStartOfWeek}
            onChange={handleStartOfWeekChange}
            dateFormat="yyyy-MM-dd"
            maxDate={selectedEndOfWeek}
            filterDate={(date) => date.getDay() === 1} // Only allow Mondays
          />
        </div>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>End of Week:</label>
          <br />
          <span>{selectedEndOfWeek.toLocaleDateString()}</span>
        </div>
        <div style
={{ marginRight: '10px', flex: 1 }}>
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
      ? Object.keys(districtTerminalMap[selectedDistrict.value]).map(
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
<Button onClick={handleShowGraph} style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: '#fff', fontSize: 17 }}>
See Weekly Report On Graph
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
<h4 style={{ textAlign: 'center', marginBottom: '10px' }}>{`Weekly report of ${selectedDistrict ? selectedDistrict.label : 'All Districts'} and ${selectedTerminal ? selectedTerminal.label : 'All Terminals'} - ${selectedStartOfWeek.toLocaleDateString()} to ${selectedEndOfWeek.toLocaleDateString()}`}</h4>
{showGraph && (
  <div id="weekly-report-graph">
    <Bar data={data} />
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

export default WeeklyReport;
