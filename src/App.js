import React, { useState, useEffect } from 'react';
import Schedule from './schedule';
import Alerts from './alerts';
import "./App.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date change
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    setSelectedDate(newDate);
  };

  useEffect(() => {
    // Set selectedDate to today when component mounts
    setSelectedDate(new Date());
  }, []);

  return (
    <div className="App">
      <h1>Housework Schedule</h1>
      <Alerts selectedDate={selectedDate} />
      
      <div>
        <label>Select a date to view schedule: </label>
        <input 
          type="date" 
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleDateChange} 
        />
      </div>

      <Schedule selectedDate={selectedDate} />
    </div>
  );
};

export default App;
