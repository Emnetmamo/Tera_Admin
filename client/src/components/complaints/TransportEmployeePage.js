import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TransportEmployeePage = () => {
  const [transportEmployeeComplaints, setTransportEmployeeComplaints] = useState([]);
  // State for storing reply messages for each complaint
  const [replyMessages, setReplyMessages] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // get all the complaints of the transport employees
        const transportEmployeeResponse = await axios.get('http://localhost:5000/api/complaints/allTransportEmployeeComplaint');
        setTransportEmployeeComplaints(transportEmployeeResponse.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  const handleReplySubmit = async (complaintId) => {
    try {
      const message = replyMessages[complaintId]; // Get the reply message for the current complaint
      await axios.put(`http://localhost:5000/api/complaints/reply/${complaintId}`, { replyMessage: message });
      // Reset the reply message for the current complaint
      setReplyMessages(prevState => ({
        ...prevState,
        [complaintId]: ''
      }));
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  return (
    <div className="complaints-list">
      {transportEmployeeComplaints.map(complaint => (
        <Card key={complaint._id} className="complaint-card">
          <Card.Body>
            <Card.Title>{complaint.complaint}</Card.Title>
            <Card.Text>{new Date(complaint.postDateTime).toLocaleString()}</Card.Text>
            <Form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(complaint._id); }}>
              <Form.Group controlId={`replyTransportEmployee-${complaint._id}`}>
                <Form.Control
                  type="text"
                  placeholder="Enter your reply"
                  value={replyMessages[complaint._id] || ''} // Set value based on replyMessages state
                  onChange={e => setReplyMessages(prevState => ({
                    ...prevState,
                    [complaint._id]: e.target.value
                  }))}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Submit Reply</Button>
            </Form>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TransportEmployeePage;
