import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DailyReport from '../../components/reports/dailyReport';
import WeeklyReport from '../../components/reports/weeklyReport';
import MonthlyReport from '../../components/reports/monthlyReport';

function Report() {
  const [selectedTab, setSelectedTab] = useState('daily'); // Default tab is 'daily'

  // useEffect to check local storage for previously selected tab
  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  // Event handler for tab selection
  const handleTabSelect = (tabKey) => {
    setSelectedTab(tabKey);
    localStorage.setItem('selectedTab', tabKey); // Store selected tab in local storage
  };

  return (
    <div>
      <Container className="mt-4">
        <h1 className='text-center'>Reports</h1>
        <Tabs
          id="report-tabs"
          activeKey={selectedTab}
          onSelect={handleTabSelect}
        >
          <Tab eventKey="daily" title="Daily">
            <DailyReport />
          </Tab>
          <Tab eventKey="weekly" title="Weekly">
            <WeeklyReport />
          </Tab>
          {/* <Tab eventKey="monthly" title="Monthly">
            <MonthlyReport />
          </Tab> */}
        </Tabs>
      </Container>
    </div>
  );
}

export default Report;
