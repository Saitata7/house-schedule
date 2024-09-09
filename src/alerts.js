import React from 'react';
import "./schedule.css";

const Alerts = ({ selectedDate }) => {
  const isTrashDay = selectedDate.getDay() === 2 || selectedDate.getDay() === 5; // Tuesday or Friday
  const isRecycleDay = selectedDate.getDay() === 0; // Sunday

  return (
    <div>
      {isTrashDay && <p className="alert">Alert: Today is Trash Day!</p>}
      {isRecycleDay && <p className="alert">Alert: Today is Recycling Day!</p>}
    </div>
  );
};

export default Alerts;
