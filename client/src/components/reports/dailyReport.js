import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import domtoimage from 'dom-to-image-more';
import districtData from '../../data/data';
import Chart from 'chart.js/auto'; // Importing Chart object from chart.js/auto

const DailyReport = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [selectedDay, selectedTerminal, selectedDistrict, reports]);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/allDailyReports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error.message);
    }
  };

  const filterReports = () => {
    const selectedDate = selectedDay.toISOString().split('T')[0];

    const filtered = reports.filter((report) => {
      const dateMatch = report.date.split('T')[0] === selectedDate;
      const terminalMatch = !selectedTerminal || report.driverId.Terminal === selectedTerminal.value;
      const districtMatch = !selectedDistrict || report.driverId.cityDistrict === selectedDistrict.value;
      return dateMatch && terminalMatch && districtMatch;
    });

    setFilteredReports(filtered);
  };

  const districtTerminalMap = districtData.District_Datas.reduce((acc, district) => {
    const districtName = district.District.name?.en; 
    if (districtName) {
      acc[districtName] = district.District.terminals.reduce((terminalAcc, terminal) => {
        const terminalName = terminal.name?.en; 
        if (terminalName) {
          terminalAcc[terminalName] = terminal.routes.map((route) => route.name?.en); 
        }
        return terminalAcc;
      }, {});
    }
    return acc;
  }, {});

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
    setSelectedTerminal(null);
    setShowGraph(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowGraph(false);
    setModalKey((prevKey) => prevKey + 1);
  };

  const handleDownloadGraph = () => {
    if (showGraph) {
      const node = document.getElementById('daily-report-graph');
      const title = document.createElement('h4');
      const district = selectedDistrict ? selectedDistrict.label : 'All Districts';
      const terminal = selectedTerminal ? selectedTerminal.label : 'All Terminals';
      title.textContent = `Daily report of ${district} and ${terminal} - ${selectedDay.toLocaleDateString()}`;
      node.insertBefore(title, node.firstChild);

      domtoimage
        .toJpeg(node, { bgcolor: '#ffffff' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `daily_report_${selectedDay.toISOString()}.jpeg`;
          link.click();
          node.removeChild(title); 
        })
        .catch((error) => {
          console.error('Error generating image:', error);
          node.removeChild(title);
        });
    }
  };

  const data = {
    labels: filteredReports.map((report) =>
      `${report.driverId?.licenseplate}\n${report.driverId?.cityDistrict}\n${report.driverId?.Terminal}\n${report.reportedBy?.fullName}`
    ),
    datasets: [
      {
        label: 'Attendance Complete',
        data: filteredReports.map((report) => (report.attendanceStatus === 'Complete' ? 1 : 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Warnings Sent',
        data: filteredReports.map((report) => (report.warningsSent === 'Yes' ? 1 : 0)),
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
      },
      {
        label: 'Punishments Given',
        data: filteredReports.map((report) => (report.punishmentsGiven.length > 0 ? 1 : 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px', display: 'flex' }}>
        <div style={{ marginRight: '10px', flex: 1 }}>
          <label>Select Day:</label>
          <br />
          <DatePicker selected={selectedDay} onChange={handleDayChange} dateFormat="yyyy-MM-dd" />
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
                ? Object.keys(districtTerminalMap[selectedDistrict.value] || {}).map((terminal) => ({
                    value: terminal,
                    label: terminal,
                  }))
                : []
            }
          />
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button
          onClick={handleShowGraph}
          style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: '#fff', fontSize: 17 }}
        >
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
            <tr key={report._id}>
              <td>{`${report.driverId?.firstName} ${report.driverId?.lastName}`}</td>
              <td>{report.driverId?.licenseplate}</td>
              <td>{report.driverId?.Terminal}</td>
              <td>{report.driverId?.cityDistrict}</td>
              <td>{report.reportedBy?.fullName}</td>
              <td>{new Date(report.date).toLocaleTimeString()}</td>
              <td>{report.attendanceStatus}</td>
              <td>{report.warningsSent}</td>
              <td>{report.punishmentsGiven.join(', ')}</td>
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

export default DailyReport;

