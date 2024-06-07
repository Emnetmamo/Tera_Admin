import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TaxiDriverPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  // Fetch complaints from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/driver/complaint/getallcomplaints'); // Ensure the correct endpoint
        setComplaints(response.data.success);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  // Handle reply submission
  const handleReplySubmit = async (complaintId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/driver/complaint/replyToComplaint/${complaintId}`, { reply });
      // Update the complaints state to reflect the new reply
      setComplaints(complaints.map(complaint =>
        complaint._id === complaintId ? response.data.success : complaint
      ));
      setReply('');
      setSelectedComplaintId(null);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const unrepliedComplaints = complaints.filter(complaint => !complaint.reply);
  const repliedComplaints = complaints.filter(complaint => complaint.reply);

  const renderComplaintItem = (complaint) => (
    <div key={complaint._id} style={styles.complaintItem}>
      <h3 style={styles.complaintTitle}>{complaint.subject}</h3>
      <p style={styles.complaintDescription}>{complaint.description}</p>
      <div style={styles.userInfo}>
        <strong>Driver Information:</strong>
        <p><strong>Name:</strong> {complaint.userId.firstName} {complaint.userId.lastName}</p>
        <p><strong>Email:</strong> {complaint.userId.email}</p>
        <p><strong>Phone:</strong> {complaint.userId.phone}</p>
        <p><strong>License Plate:</strong> {complaint.userId.licenseplate}</p>
      </div>
      {complaint.reply ? (
        <p style={styles.reply}><strong>Reply:</strong> {complaint.reply}</p>
      ) : (
        selectedComplaintId === complaint._id ? (
          <div style={styles.replyContainer}>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              style={styles.textarea}
              placeholder="Type your reply here..."
            />
            <button
              onClick={() => handleReplySubmit(complaint._id)}
              style={styles.button}
            >
              Send Reply
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSelectedComplaintId(complaint._id)}
            style={styles.button}
          >
            Reply
          </button>
        )
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <Tabs>
        <TabList>
          <Tab>Unreplied Complaints</Tab>
          <Tab>Replied Complaints</Tab>
        </TabList>

        <TabPanel>
          {unrepliedComplaints.length > 0 ? (
            unrepliedComplaints.map(renderComplaintItem)
          ) : (
            <p>No unreplied complaints.</p>
          )}
        </TabPanel>
        <TabPanel>
          {repliedComplaints.length > 0 ? (
            repliedComplaints.map(renderComplaintItem)
          ) : (
            <p>No replied complaints.</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  complaintItem: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  complaintTitle: {
    margin: '0 0 10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  complaintDescription: {
    margin: '0 0 10px',
  },
  userInfo: {
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
  },
  reply: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '5px',
  },
  replyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    minHeight: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'vertical',
    fontSize: '14px',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TaxiDriverPage;
