import React, {useState, useEffect}  from "react";
import Navbar from './components/Navbar';
import Modal from "./components/Modal";
import Sidebar from './components/Sidebar'
import './styles/ToDo.css'

import { MdOutlineExpandLess } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

function ToDo() {
    const [showTitleRenameInput, setShowTitleRenameInput] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [checkboxTriggered, setCheckboxTriggered] = useState(false);

    const [allTodoList, setAllTodoList] = useState({
        "General Tasks" : [
            {
                name : "Task1",
                date : "05/10/2024", 
                priority : "high", 
                completed : false 
            },
            {
                name : "Task2",
                date : "09/10/2024", 
                priority : "medium", 
                completed : false 
            },
            {
                name : "Task3",
                date : "10/10/2024", 
                priority : "low", 
                completed : false 
            },
            {
                name : "Task4",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task5",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task6",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task7",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task8",
                date : "", 
                priority : "", 
                completed : false 
            }
        ],
        List1 : [],
        List2 : [],
        List3 : [],
        List4 : [],
        List5 : [],
        List6 : [],
        List7 : [],
        List8 : [],
        List9 : [],
        List10 : [],
        List11 : [],
        List12 : [],
        List13 : [],
        List14 : [],
        List15 : [],
        List16 : [],
        List17 : [],
        List18 : [],
        List19 : [],
        List20 : []
    });
    const [currentList, setCurrentList] = useState(Object.values(allTodoList)[0]);
    const [modifiedCurList, setModifiedCurList] = useState([]);
    const [currentListName, setCurrentListName] = useState(Object.keys(allTodoList)[0]);
    
    const [prevListName, setPrevListName] = useState("");
    const [currentItemIdx, setCurrentItemIdx] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalButtonMsg, setModalButtonMsg] = useState([]);
    
    const [currentItem, setCurrentItem] = useState({
        name : "",
        date : "", 
        priority : "", 
        completed : false 
    });


    function addNewList(listName) {
        console.log("Received list:", listName);

        if (!(listName in allTodoList)) {
            setAllTodoList(prevState => ({
                ...prevState, 
                [listName]: []
            }));
        }
    }

    
    function deleteList(listName) {
        console.log("list to be deleted: ", listName);    
        const updatedTodoList = { ...allTodoList };
        delete updatedTodoList[listName];
        setAllTodoList(updatedTodoList);
        setCurrentList(allTodoList["General Tasks"]);
        setCurrentListName("General Tasks");
        setCurrentItemIdx(null);
    }

    function addCurrentList(listName) {
        console.log("Received list:", listName);
        if (listName in allTodoList) {
            setCurrentListName(listName);
            setCurrentList(allTodoList[listName]);
        }

    }

    useEffect(() => {
        console.log(allTodoList);
    }, [allTodoList]);

    useEffect(() => {
        console.log("currentList :" + currentList);

        const updatedTodoList = { ...allTodoList };
        updatedTodoList[currentListName] = currentList;
        setAllTodoList(updatedTodoList);
    }, [currentList]);

    useEffect(() => {
        if(checkboxTriggered) {
            const updatedList = [...currentList];
            updatedList[currentItemIdx] = currentItem;
            setCurrentList(updatedList);
            setCheckboxTriggered(false);
        }
    }, [checkboxTriggered]);

    useEffect(() => {
        //even though currentListName is being updated everytime onChange of input field, prevListName is not being updated with the new value of currentListName immediately, because setMethods are asynchronous and gets executed in batch after all the synchronous operations
        //so this has no effect whether we set it before or after the if condition, it actually gets executed later, and hence we're actually getting the value of currentListName in prevListName when the showTitleRenameInput was being set to true the first time the title was clicked
        
        if(currentListName && !showTitleRenameInput) {
            // console.log("prevListName :" + prevListName)
            // console.log("currentListName :" + currentListName)
            // console.log(showTitleRenameInput)
            
            if (prevListName in allTodoList && prevListName!==currentListName && !Object.keys(allTodoList).includes(currentListName)) {
                const updatedTodoList = { ...allTodoList };
                updatedTodoList[currentListName] = updatedTodoList[prevListName];
                delete updatedTodoList[prevListName];
                setAllTodoList(updatedTodoList);
            }
            else if (currentListName === "General Tasks" || currentListName in allTodoList) {
                console.log("currentListName :" + currentListName)
                setModalMsg("The List named \'"+currentListName+"\' already exists.")
                setModalButtonMsg(["OK"]);
                setShowModal(true);
            }
        }
        setPrevListName(currentListName); 
      }, [showTitleRenameInput]);


      
    function handleTitleClick() {
        if (currentListName !== Object.keys(allTodoList)[0]) {
            setShowTitleRenameInput(true);
        }
    }

    const handleTitleInputChange = (e) => {
        setCurrentListName(e.target.value);
    };

    const handleTitleInputBlur = () => {
        setShowTitleRenameInput(false);
    };


    function handleModal() {
        setShowModal(false);
        setModalMsg("");
        setModalButtonMsg([]);
        setCurrentList(allTodoList[currentListName])
    }

    function handleAddItemOnClick(index) {
        if (index == currentList.length) {
            const curItem = currentItem;
            setCurrentItem(curItem);
        }
        else {
            const curItem = currentList[index];
            setCurrentItem(curItem);
        }
        setExpanded(true);
        setCurrentItemIdx(index);
    }

    function handleAddItemOnBlur() {
        setExpanded(false);
        setCurrentItemIdx(null);
    }

    function handleDeleteTask(index) {
        const updatedCurList = [...currentList];
        updatedCurList.splice(index,1);
        setCurrentList(updatedCurList);
        setShowModal(false);
        setModalMsg("");
        setModalButtonMsg([]);
    }
    
    function setDeleteTaskModalItems() {
        setShowModal(true);
        setModalButtonMsg(["Yes", "No"]);
        setModalMsg("Are you sure you want to delete this Task?")
    }

    function handleCurrentItemChange(propertyName, value) {
        setCurrentItem({ ...currentItem, [propertyName]: value });
    }
    
    function handleCurrentListChange(idx) {
        if (idx === currentList.length) {
            const updatedList = [...currentList, currentItem];
            setCurrentList(updatedList);
        }
        else {
            const updatedList = [...currentList];
            updatedList[idx] = currentItem;
            setCurrentList(updatedList);
        }

    }

    function handleCurrentItemCheckBoxChange(idx) {
        console.log("currentItem to be checked : ", currentList[idx])
        setCurrentItem({ ...currentList[idx], completed: !currentList[idx].completed });
        setCheckboxTriggered(true);
    }
 
    function sortCurList(sortedList) {
        setModifiedCurList(sortedList);
    }

    return(
        <div className="outer-container">
            <Navbar allList={allTodoList} funcToAddList={addNewList} funcToDeleteList={deleteList} sendCurrentListName={addCurrentList}/>
            
            <div className="list-items-container">
                <div className="list-name">
                    <div onClick={handleTitleClick}><h1>{currentListName}</h1></div>
                    {showTitleRenameInput && (
                        <input className="add-list-name-input"
                            type="text"
                            value={currentListName}
                            onChange={handleTitleInputChange}
                            onBlur={handleTitleInputBlur}
                            autoFocus
                        />
                    )}
                </div>

                {modifiedCurList.length===0 && (<div className="list-items">
                    
                    <div className={`add-list-name-btn ${currentItemIdx === currentList.length ? 'expanded' : ''}`} 
                        style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} 
                        onClick={() => handleAddItemOnClick(currentList.length)}>
                        <div className="item-name">
                            <div style={{width:'40%'}}>+ Add New Task</div>
                            {expanded && currentItemIdx === currentList.length && <MdOutlineExpandLess style={{marginLeft:'65%'}} onClick={(event) => { event.stopPropagation(); handleAddItemOnBlur(); }}/>}
                        </div>
                        {currentItemIdx === currentList.length && (
                            <div className="current-item-info" style={{marginTop:'4%'}} >
                                <input className="edit-item-input"
                                    style={{height: '30px', borderRadius:'4px', width:'90%', marginTop:'10px'}} 
                                    type="text"
                                    onChange={(e) => handleCurrentItemChange('name', e.target.value)}
                                    placeholder="Enter Task"
                                    autoFocus
                                />
                                
                                <label style={{height: '120%', width:'90%', marginTop:'8px'}} htmlFor="calendar">Select a date:</label>
                                <input style={{height: '30px', borderRadius:'4px', width:'90%', background:'grey'}} type="date" id="calendar" name="calendar" 
                                    onChange={(e) => handleCurrentItemChange('date', e.target.value)}
                                />

                                <fieldset style={{width:'90%', marginTop:'10px'}} >
                                    <legend>Select Priority:</legend>
                                    <label htmlFor="priority1">
                                    <input
                                        type="radio"
                                        id="priority1"
                                        name="language"
                                        value="High"
                                        // checked={selectedLanguage === 'high'}
                                        onChange={(e) => handleCurrentItemChange('priority', "high")}
                                    />
                                    High
                                    </label><br />
                                    <label htmlFor="priority2">
                                    <input
                                        type="radio"
                                        id="priority2"
                                        name="language"
                                        value="python"
                                        // checked={selectedLanguage === 'medium'}
                                        onChange={(e) => handleCurrentItemChange('priority', "medium")}
                                    />
                                    Medium
                                    </label><br />
                                    <label htmlFor="priority3">
                                    <input
                                        type="radio"
                                        id="language3"
                                        name="language"
                                        value="java"
                                        // checked={selectedLanguage === 'low'}
                                        onChange={(e) => handleCurrentItemChange('priority', "low")}
                                    />
                                    Low
                                    </label><br />
                                </fieldset>
                                <div className="save-delete" style={{ marginLeft:'93%', marginTop:'3%'}}>
                                    <TiTick onClick={() => handleCurrentListChange(currentList.length)}/>
                                </div>
                            </div>
                        )} 
                    </div>

                    {currentList && currentList.map((item, index) => (
                        <div className={`show-list-item-btn ${currentItemIdx === index ? 'expanded' : ''}`} 
                        style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '10px', marginBottom: index === currentList.length - 1 ? '50px' : '10px'}} 
                        onClick={() => handleAddItemOnClick(index)} 
                        tabIndex={0} 
                        key={index}
                        >
                        
                        <div className="item-name">
                            
                            <label htmlFor="completed">
                                <input className="custom-checkbox"
                                    type="checkbox"
                                    id="completed"
                                    value="completed"
                                    checked={item.completed}
                                    onChange={(e) => handleCurrentItemCheckBoxChange(index)}
                                />
                            </label><br />
                            {item.priority==="low" && <FaRegStar style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            {item.priority==="medium" && <FaStarHalfAlt style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            {item.priority==="high" && <FaStar style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            
                            <div style={{marginLeft:'3%',width:'40%'}}>{item.name}</div>
                            {!expanded && <RxCross2 onClick={setDeleteTaskModalItems} style={{ marginLeft:'70%', fontSize: '1.5rem'}}/>}
                            {expanded && currentItemIdx === index && <MdOutlineExpandLess style={{marginLeft:'65%'}} onClick={(event) => { event.stopPropagation(); handleAddItemOnBlur(); }}/>}
                        </div>

                        {currentItemIdx === index && (
                            <div className="current-item-info" style={{marginTop:'4%'}} >
                                {item.name}
                                <input className="edit-item-input"
                                    style={{height: '30px', borderRadius:'4px', width:'90%', marginTop:'10px'}} 
                                    type="text"
                                    onChange={(e) => handleCurrentItemChange('name', e.target.value)}
                                    placeholder="Enter Task"
                                    autoFocus
                                />
                                
                                <div style={{marginTop:'24px'}}>{item.date}</div>
                                <label style={{height: '120%', width:'90%', marginTop:'8px'}} htmlFor="calendar">Select a date:</label>
                                <input style={{height: '30px', borderRadius:'4px', width:'90%', background:'grey'}} type="date" id="calendar" name="calendar" 
                                    onChange={(e) => handleCurrentItemChange('date', e.target.value)}
                                />

                                <div style={{marginTop:'24px'}}>{item.priority}</div>
                                <fieldset style={{width:'90%', marginTop:'10px'}} >
                                    <legend>Select Priority:</legend>
                                    <label htmlFor="priority1">
                                    <input
                                        type="radio"
                                        id="priority1"
                                        value="High"
                                        onChange={(e) => handleCurrentItemChange('priority', "high")}
                                    />
                                    High
                                    </label><br />
                                    <label htmlFor="priority2">
                                    <input
                                        type="radio"
                                        id="priority2"
                                        value="medium"
                                        onChange={(e) => handleCurrentItemChange('priority', "medium")}
                                    />
                                    Medium
                                    </label><br />
                                    <label htmlFor="priority3">
                                    <input
                                        type="radio"
                                        id="language3"
                                        value="low"
                                        onChange={(e) => handleCurrentItemChange('priority', "low")}
                                    />
                                    Low
                                    </label><br />
                                </fieldset>
                                <div className="save-delete" style={{ marginLeft:'93%', marginTop:'3%'}}>
                                    <TiTick onClick={() => handleCurrentListChange(index)}/>
                                    <RxCross2 onClick={setDeleteTaskModalItems} style={{ marginLeft:'20%'}}/>
                                </div>
                            </div>
                        )} 
                        </div>

                    ))}

                </div>)}

                

                {modifiedCurList.length!==0 && (<div className="list-items">
                    
                    <div className={`add-list-name-btn ${currentItemIdx === currentList.length ? 'expanded' : ''}`} 
                        style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} 
                        onClick={() => handleAddItemOnClick(currentList.length)}>
                        <div className="item-name">
                            <div style={{width:'40%'}}>+ Add New Task</div>
                            {expanded && currentItemIdx === currentList.length && <MdOutlineExpandLess style={{marginLeft:'65%'}} onClick={(event) => { event.stopPropagation(); handleAddItemOnBlur(); }}/>}
                        </div>
                        {currentItemIdx === currentList.length && (
                            <div className="current-item-info" style={{marginTop:'4%'}} >
                                <input className="edit-item-input"
                                    style={{height: '30px', borderRadius:'4px', width:'90%', marginTop:'10px'}} 
                                    type="text"
                                    onChange={(e) => handleCurrentItemChange('name', e.target.value)}
                                    placeholder="Enter Task"
                                    autoFocus
                                />
                                
                                <label style={{height: '120%', width:'90%', marginTop:'8px'}} htmlFor="calendar">Select a date:</label>
                                <input style={{height: '30px', borderRadius:'4px', width:'90%', background:'grey'}} type="date" id="calendar" name="calendar" 
                                    onChange={(e) => handleCurrentItemChange('date', e.target.value)}
                                />

                                <fieldset style={{width:'90%', marginTop:'10px'}} >
                                    <legend>Select Priority:</legend>
                                    <label htmlFor="priority1">
                                    <input
                                        type="radio"
                                        id="priority1"
                                        name="language"
                                        value="High"
                                        // checked={selectedLanguage === 'high'}
                                        onChange={(e) => handleCurrentItemChange('priority', "high")}
                                    />
                                    High
                                    </label><br />
                                    <label htmlFor="priority2">
                                    <input
                                        type="radio"
                                        id="priority2"
                                        name="language"
                                        value="python"
                                        // checked={selectedLanguage === 'medium'}
                                        onChange={(e) => handleCurrentItemChange('priority', "medium")}
                                    />
                                    Medium
                                    </label><br />
                                    <label htmlFor="priority3">
                                    <input
                                        type="radio"
                                        id="language3"
                                        name="language"
                                        value="java"
                                        // checked={selectedLanguage === 'low'}
                                        onChange={(e) => handleCurrentItemChange('priority', "low")}
                                    />
                                    Low
                                    </label><br />
                                </fieldset>
                                <div className="save-delete" style={{ marginLeft:'93%', marginTop:'3%'}}>
                                    <TiTick onClick={() => handleCurrentListChange(currentList.length)}/>
                                </div>
                            </div>
                        )} 
                    </div>

                    {currentList && currentList.map((item, index) => (
                        <div className={`show-list-item-btn ${currentItemIdx === index ? 'expanded' : ''}`} 
                        style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '10px', marginBottom: index === currentList.length - 1 ? '50px' : '10px'}} 
                        onClick={() => handleAddItemOnClick(index)} 
                        tabIndex={0} 
                        key={index}
                        >
                        
                        <div className="item-name">
                            
                            <label htmlFor="completed">
                                <input className="custom-checkbox"
                                    type="checkbox"
                                    id="completed"
                                    value="completed"
                                    checked={item.completed}
                                    onChange={(e) => handleCurrentItemCheckBoxChange(index)}
                                />
                            </label><br />
                            {item.priority==="low" && <FaRegStar style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            {item.priority==="medium" && <FaStarHalfAlt style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            {item.priority==="high" && <FaStar style={{marginLeft:'1%', fontSize: '22px'}}/>}
                            
                            <div style={{marginLeft:'3%',width:'40%'}}>{item.name}</div>
                            {!expanded && <RxCross2 onClick={setDeleteTaskModalItems} style={{ marginLeft:'70%', fontSize: '1.5rem'}}/>}
                            {expanded && currentItemIdx === index && <MdOutlineExpandLess style={{marginLeft:'65%'}} onClick={(event) => { event.stopPropagation(); handleAddItemOnBlur(); }}/>}
                        </div>

                        {currentItemIdx === index && (
                            <div className="current-item-info" style={{marginTop:'4%'}} >
                                {item.name}
                                <input className="edit-item-input"
                                    style={{height: '30px', borderRadius:'4px', width:'90%', marginTop:'10px'}} 
                                    type="text"
                                    onChange={(e) => handleCurrentItemChange('name', e.target.value)}
                                    placeholder="Enter Task"
                                    autoFocus
                                />
                                
                                <div style={{marginTop:'24px'}}>{item.date}</div>
                                <label style={{height: '120%', width:'90%', marginTop:'8px'}} htmlFor="calendar">Select a date:</label>
                                <input style={{height: '30px', borderRadius:'4px', width:'90%', background:'grey'}} type="date" id="calendar" name="calendar" 
                                    onChange={(e) => handleCurrentItemChange('date', e.target.value)}
                                />

                                <div style={{marginTop:'24px'}}>{item.priority}</div>
                                <fieldset style={{width:'90%', marginTop:'10px'}} >
                                    <legend>Select Priority:</legend>
                                    <label htmlFor="priority1">
                                    <input
                                        type="radio"
                                        id="priority1"
                                        value="High"
                                        onChange={(e) => handleCurrentItemChange('priority', "high")}
                                    />
                                    High
                                    </label><br />
                                    <label htmlFor="priority2">
                                    <input
                                        type="radio"
                                        id="priority2"
                                        value="medium"
                                        onChange={(e) => handleCurrentItemChange('priority', "medium")}
                                    />
                                    Medium
                                    </label><br />
                                    <label htmlFor="priority3">
                                    <input
                                        type="radio"
                                        id="language3"
                                        value="low"
                                        onChange={(e) => handleCurrentItemChange('priority', "low")}
                                    />
                                    Low
                                    </label><br />
                                </fieldset>
                                <div className="save-delete" style={{ marginLeft:'93%', marginTop:'3%'}}>
                                    <TiTick onClick={() => handleCurrentListChange(index)}/>
                                    <RxCross2 onClick={setDeleteTaskModalItems} style={{ marginLeft:'20%'}}/>
                                </div>
                            </div>
                        )} 
                        </div>

                    ))}

                </div>)}

            </div>

            {showModal && 
                <Modal 
                    msgToDisplay={modalMsg} 
                    handleModal={handleModal} 
                    buttonMsgsList={modalButtonMsg} 
                    deleteItemFunc={handleDeleteTask} 
                    curItemIdx={currentItemIdx} 
                />}
            <Sidebar curList={currentList} funcToSort={sortCurList}/>
        </div>
    );
}

export default ToDo;
