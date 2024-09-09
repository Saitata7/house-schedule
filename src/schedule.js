import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./schedule.css";

const names = {
  "bedroom1": ["Sai", "Lohith", "Vijay", "Pavan"],
  "bedroom2": ["Tarun", "Yeshwanth"],
  "bedroom3": ["Poojitha", "Sri Lekha", "Sri Devi", "Mrudhula"]
};

const allNames = [
  ...names.bedroom1,
  ...names.bedroom2,
  ...names.bedroom3
];

const getDayOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 6 || day === 0; // Saturday = 6, Sunday = 0
};

const getNextWeekend = (date) => {
  const nextSaturday = new Date(date);
  nextSaturday.setDate(date.getDate() + (6 - date.getDay())); // Move to next Saturday
  if (isWeekend(nextSaturday)) {
    return nextSaturday;
  }
  return new Date(date);
};

const getUpcomingWeekendInTwoWeeks = (date) => {
  const nextSaturday = getNextWeekend(date);
  nextSaturday.setDate(nextSaturday.getDate() + 14); // Move to next weekend in 2 weeks
  return nextSaturday;
};

const Schedule = ({ selectedDate }) => {
  const [workASchedule, setWorkASchedule] = useState([]);
  const [workBSchedule, setWorkBSchedule] = useState([]);
  const [workCSchedule, setWorkCSchedule] = useState([]);

  useEffect(() => {
    const createWorkA = () => {
      const schedule = [];
      for (let i = 0; i < 365; i++) {
        schedule.push({
          day: `Day ${i + 1}`,
          task: "Dishes",
          name: allNames[i % allNames.length],
        });
      }
      return schedule;
    };

    const createWorkB = () => {
      const schedule = [];
      for (let i = 0; i < 365; i += 14) { // Every 2 weeks
        const weekend = getUpcomingWeekendInTwoWeeks(new Date(new Date().setDate(i)));
        schedule.push({
          day: weekend.toDateString(),
          hall: allNames[(i % allNames.length)],
          stove: allNames[(i + 1) % allNames.length],
        });
      }
      return schedule;
    };

    const createWorkC = () => {
      const schedule = [];
      for (let i = 0; i < 365; i += 14) { // Every 2 weeks
        const weekend = getUpcomingWeekendInTwoWeeks(new Date(new Date().setDate(i)));
        schedule.push({
          day: weekend.toDateString(),
          bedroom1: names.bedroom1[i % names.bedroom1.length],
          bedroom2: names.bedroom2[i % names.bedroom2.length],
          bedroom3: names.bedroom3[i % names.bedroom3.length],
          bathroom1: names.bedroom1[(i + 1) % names.bedroom1.length],
          bathroom2: names.bedroom2[(i + 1) % names.bedroom2.length],
          bathroom3: names.bedroom3[(i + 1) % names.bedroom3.length],
        });
      }
      return schedule;
    };

    setWorkASchedule(createWorkA());
    setWorkBSchedule(createWorkB());
    setWorkCSchedule(createWorkC());
  }, []);

  const currentDay = getDayOfYear(selectedDate);
  const currentWeekend = getUpcomingWeekendInTwoWeeks(selectedDate).toDateString();
  const isWeekendDay = isWeekend(selectedDate);

  return (
    <div className="container">
      <h2>Schedule for {selectedDate.toDateString()}</h2>

      {/* Work A - Daily Tasks */}
      <h3>Work A - Daily</h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Dishes: {workASchedule[currentDay]?.name}
      </motion.p>

      {/* Work B - Weekend Tasks */}
      {isWeekendDay && (
        <div className="work-b-container">
          <h3 className="work-b">Work B - Weekend Tasks</h3>
          {workBSchedule.find(task => task.day === currentWeekend) ? (
            <div className="work-b-box">
              <p>Hall Cleaning: {workBSchedule.find(task => task.day === currentWeekend)?.hall}</p>
              <p>Stove Cleaning: {workBSchedule.find(task => task.day === currentWeekend)?.stove}</p>
            </div>
          ) : (
            <div className="alert">No Work B tasks assigned for this date.</div>
          )}
        </div>
      )}

      {/* Work C - Weekend Tasks by Bedroom */}
      {isWeekendDay && (
        <>
          <h3>Work C - Weekend Tasks</h3>
          {workCSchedule.find(task => task.day === currentWeekend) ? (
            <div className="work-c-container">
              <motion.div className="work-c-box bedroom1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h4>Bedroom 1</h4>
                <p>Bed Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bedroom1}</p>
                <p>Bathroom Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bathroom1}</p>
              </motion.div>
              <motion.div className="work-c-box bedroom2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h4>Bedroom 2</h4>
                <p>Bed Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bedroom2}</p>
                <p>Bathroom Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bathroom2}</p>
              </motion.div>
              <motion.div className="work-c-box bedroom3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h4>Bedroom 3</h4>
                <p>Bed Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bedroom3}</p>
                <p>Bathroom Cleaning: {workCSchedule.find(task => task.day === currentWeekend)?.bathroom3}</p>
              </motion.div>
            </div>
          ) : (
            <div>No Work C tasks assigned for this date.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Schedule;
