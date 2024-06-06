import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const TransportEmployeePage = () => {
  const [transportEmployeeComplaints, setTransportEmployeeComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [replyMessages, setReplyMessages] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const transportEmployeeResponse = await axios.get('http://localhost:5000/api/complaints/allTransportEmployeeComplaint');
        setTransportEmployeeComplaints(transportEmployeeResponse.data);
        // Set filtered complaints initially to all complaints
        setFilteredComplaints(transportEmployeeResponse.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleReplySubmit = async (complaintId) => {
    try {
      const message = replyMessages[complaintId];
      await axios.put(`http://localhost:5000/api/complaints/reply/${complaintId}`, { replyMessage: message });
      
      setTransportEmployeeComplaints(prevState => {
        return prevState.map(complaint => {
          if (complaint._id === complaintId) {
            return {
              ...complaint,
              reply: message,
              replyDateTime: new Date()
            };
          }
          return complaint;
        });
      });
window.location.reload();
      setReplyMessages(prevState => ({
        ...prevState,
        [complaintId]: ''
      }));
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleFilter = () => {
    // Filter complaints that haven't received a reply
    const filtered = transportEmployeeComplaints.filter(complaint => complaint.reply === 'No reply has been sent!');
    setFilteredComplaints(filtered);
  };

  return (
    <div className="complaints-list">
      <Row className="mb-3 justify-content-between">
        <Col xs="auto">
          <Button style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }} onClick={() => setFilteredComplaints(transportEmployeeComplaints)}>All Complaints</Button>
        </Col>
        <Col xs="auto">
          <Button style={{ backgroundColor: 'rgb(165, 94, 13)', borderColor: "#fff", fontSize: 17 }} onClick={handleFilter}>Filter Unreplied Complaints</Button>
        </Col>
      </Row>
      {filteredComplaints.map(complaint => (
        <Card key={complaint._id} className="complaint-card mb-3">
          <Card.Body>
            <Card.Title>{complaint.complaint}</Card.Title>
            <Card.Text>{new Date(complaint.postDateTime).toLocaleString()}</Card.Text>
          </Card.Body>
          {complaint.reply !== 'No reply has been sent!' && (
            <div className="reply-container">
              <hr className="reply-separator" />
              <Card.Body>
                <p className="reply-text">{complaint.reply}</p>
                <p className="reply-time">{new Date(complaint.replyDateTime).toLocaleString()}</p>
              </Card.Body>
            </div>
          )}
          {complaint.reply === 'No reply has been sent!' ? (
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
              <Button variant="primary" type="submit">Send Reply</Button>
            </Form>
          ) : (
            <Button variant="secondary" disabled>Reply Sent</Button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default TransportEmployeePage;
