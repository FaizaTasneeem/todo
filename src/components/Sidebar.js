import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Sidebar({curList}) {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  useEffect(() => {
    console.log(date);
}, [date]);

  return (
    <div className="sidebar-container">
        <div style={{paddingTop:'15%'}}>Select a date to view tasks.</div>
        <Calendar className="custom-calendar"
            onChange={onChange}
            value={date}
        />

        <div style={{paddingTop:'15%'}}>Sort By: </div>
        <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} >Date</button>
        <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} >Priority</button>
    </div>
  );
};

export default Sidebar;
