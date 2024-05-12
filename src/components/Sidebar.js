import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Sidebar({curList, funcToSort}) {
    const [date, setDate] = useState(new Date());
    const [sortedCurList, setSortedCurList] = useState([]);
    const priorityOrder = ['high', 'medium', 'low'];

    function sortByDate() {
        curList.sort((a, b) => {
            const dateA = a.date ? new Date(a.date) : new Date('2075-01-01');
            const dateB = b.date ? new Date(b.date) : new Date('2075-01-01');
            return dateA - dateB;
        })
        setSortedCurList(curList);
    }

    function sortByPriority() {
        curList.sort((a, b) => {
            const priorityA = a.priority ? priorityOrder.indexOf(a.priority) : Number.MAX_SAFE_INTEGER;
            const priorityB = b.priority ? priorityOrder.indexOf(b.priority) : Number.MAX_SAFE_INTEGER;
            return priorityA - priorityB;
        })
        setSortedCurList(curList);
    }

    const onChange = (newDate) => {
        setDate(newDate);
    };

   
    useEffect(() => {
        console.log(date);
    }, [date]);

    useEffect(() => {
        funcToSort(sortedCurList);
    }, [sortedCurList]);


    return (
        <div className="sidebar-container">
            <div style={{paddingTop:'15%'}}>Select a date to view tasks.</div>
            <Calendar className="custom-calendar"
                onChange={onChange}
                value={date}
            />

            <div style={{paddingTop:'15%'}}>Sort By: </div>
            <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={sortByDate}>Date</button>
            <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={sortByPriority}>Priority</button>
        </div>
    );
};

export default Sidebar;
