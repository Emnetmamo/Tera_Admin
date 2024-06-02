import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faCar } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/passengerComplaint.css';

const PassengerPage = () => {
  const [transportEmployeeComplaints, setTransportEmployeeComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [replyMessages, setReplyMessages] = useState({});
  const [viewFlagged, setViewFlagged] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // Initialize activeTab state

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const transportEmployeeResponse = await axios.get('http://localhost:5000/api/complaints/allPassengerComplaint');
        const sortedComplaints = transportEmployeeResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTransportEmployeeComplaints(sortedComplaints);
        
        // Restore active tab from localStorage
        const savedTab = localStorage.getItem('passengerPageActiveTab');
        if (savedTab && (savedTab === 'unreplied' || savedTab === 'flagged')) {
          handleTabChange(savedTab);
        } else {
          handleTabChange('all');
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []); // Ensure it only runs once on mount

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Save active tab to localStorage
    localStorage.setItem('passengerPageActiveTab', tab);

    // Apply filter based on active tab
    if (tab === 'unreplied') {
      handleFilter();
    } else if (tab === 'flagged') {
      handleFlaggedDrivers();
    } else {
      handleShowAllComplaints();
    }
  };

  const handleReplySubmit = async (complaintId) => {
    try {
      const message = replyMessages[complaintId];
      if (!message) {
        console.error('Reply message cannot be empty');
        return;
      }
      await axios.put(`http://localhost:5000/api/complaints/replyPassenger/${complaintId}`, { replyMessage: message });

      setTransportEmployeeComplaints(prevState => {
        return prevState.map(complaint => {
          if (complaint._id === complaintId) {
            return {
              ...complaint,
              reply: message,
              respondedAt: new Date(),
              replyDateTime: new Date()
            };
          }
          return complaint;
        });
      });
      
      setReplyMessages(prevState => ({
        ...prevState,
        [complaintId]: ''
      }));

      toast.success('Reply sent successfully');
      // Reload the page to update the UI
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      // Automatically remove from filteredComplaints if it was unreplied
      setFilteredComplaints(prevState => prevState.filter(complaint => complaint._id !== complaintId || message));
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast.error('Failed to send reply');
    }
  };

  const handleFilter = () => {
    // Filter complaints that haven't received a reply
    const filtered = transportEmployeeComplaints.filter(complaint => !complaint.reply);
    setFilteredComplaints(filtered);
    setViewFlagged(false);
  };

  const handleFlaggedDrivers = () => {
    // Count the number of complaints per license plate
    const complaintCounts = transportEmployeeComplaints.reduce((acc, complaint) => {
      acc[complaint.plate] = (acc[complaint.plate] || 0) + 1;
      return acc;
    }, {});

    // Filter to only show license plates with 10 or more complaints and sort by number of complaints
    const flagged = Object.entries(complaintCounts)
      .filter(([plate, count]) => count >= 10)
      .sort((a, b) => b[1] - a[1]) // Sort by the number of complaints in descending order
      .map(([plate, count]) => ({ plate, count }));

    setFilteredComplaints(flagged);
    setViewFlagged(true);
  };

  const handleShowAllComplaints = () => {
    // Display most recent complaints at the top
    const sortedComplaints = [...transportEmployeeComplaints].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredComplaints(sortedComplaints);
    setViewFlagged(false);
  };

  return (
    <div className="complaints-list">
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Button
            style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }}
            onClick={() => {
              handleTabChange('all');
            }}
            variant={activeTab === 'all' ? 'primary' : '#ccc'}
          >
            All Complaints
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }}
            onClick={() => {
              handleTabChange('unreplied');
            }}
            variant={activeTab === 'unreplied' ? 'primary' : '#ccc'}
          >
            Filter Unreplied Complaints
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }}
            onClick={() => {
              handleTabChange('flagged');
            }}
            variant={activeTab === 'flagged' ? 'primary' : '#ccc'}
          >
            Flagged Drivers
          </Button>
        </Col>
      </Row>
      {viewFlagged ? (
        filteredComplaints.map((complaint, index) => (
          <Card key={index} className="complaint-card mb-3 flagged-card">
            <Card.Body className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCar} className="car-icon mr-2" />
                <span className="plate-number">License Plate - {complaint.plate}</span>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faFlag} className="flag-icon mr-2" />
                <span className="complaint-count">Complaints: {complaint.count}</span>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        filteredComplaints.map(complaint =>(
          <Card key={complaint._id} className="complaint-card mb-3">
            <Card.Body>
              <Card.Title>License Plate: {complaint.plate}</Card.Title>
              <Card.Text>Type of Offense: {complaint.type}</Card.Text>
              <Card.Text>Description: {complaint.description}</Card.Text>
              <Card.Text className="reply-time"> {new Date(complaint.createdAt).toLocaleString()}</Card.Text>
            </Card.Body>
            {complaint.reply && (
              <div>
                <hr className="reply-separator" />
                <Card.Body>
                  <p className="reply-text">{complaint.reply}</p>
                  <p className="reply-time"> {new Date(complaint.respondedAt).toLocaleString()}</p>
                </Card.Body>
              </div>
            )}
            {!complaint.reply ? (
              <Form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(complaint._id); }}>
                <Form.Group controlId={`replyTransportEmployee-${complaint._id}`}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your reply"
                    value={replyMessages[complaint._id] || ''}
                    onChange={e => setReplyMessages(prevState => ({
                      ...prevState,
                      [complaint._id]: e.target.value
                    }))}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Submit Reply</Button>
              </Form>
            ) : (
              <Button variant="secondary" disabled>Reply Sent</Button>
            )}
          </Card>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default PassengerPage;

