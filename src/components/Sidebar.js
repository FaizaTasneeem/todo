import React, { useState, useEffect, useRef } from 'react';
import '../styles/Sidebar.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Sidebar({curList, funcToSort, sendSelectedProp, unselectAll}) {
    const isInitialRender = useRef(true);
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

    function selectDate (newDate) {
        setDate(newDate) ;
    }
   
    useEffect(() => {
        if (!isInitialRender.current) {
            sendSelectedProp("date", date);
        } else {
            isInitialRender.current = false;
        }
    }, [date]);

    useEffect(() => {
        if (sortedCurList.length>0) {
            funcToSort(sortedCurList);
            setSortedCurList([]);
        }
    }, [sortedCurList]);


    return (
        <div className="sidebar-container">
            <div style={{paddingTop:'15%'}}>Select a date to view tasks.</div>
            <Calendar className="custom-calendar"
                onChange={selectDate}
                value={date}
            />
            <div className='done-undone-tasks'>
                <button className='sidebar-btns bigger' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={() => sendSelectedProp('completed', true)}>Completed</button>
                <button className='sidebar-btns bigger' style={{paddingTop:'15px', paddingBottom:'25px', marginLeft:'10%'}} onClick={() => sendSelectedProp('completed', false)}>Uncompleted</button>
            </div>
            <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={unselectAll}>Show All</button>

            <div style={{paddingTop:'15%'}}>Sort By: </div>
            <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={sortByDate}>Date</button>
            <button className='sidebar-btns' style={{paddingTop:'15px', paddingBottom:'25px'}} onClick={sortByPriority}>Priority</button>

        </div>
    );
};

export default Sidebar;