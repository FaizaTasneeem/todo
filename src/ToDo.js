import React, {useState, useEffect}  from "react";
import Navbar from './components/Navbar';
import Modal from "./components/Modal";
import './styles/ToDo.css'
import { MdOutlineExpandLess } from "react-icons/md";


function ToDo() {
    const [showTitleRenameInput, setShowTitleRenameInput] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const [allTodoList, setAllTodoList] = useState({
        "General Tasks" : [],
        General1 : [],
        General2 : [
            {
                name : "Task1",
                date : "05/10/2024", 
                priority : "high", 
                completed : false 
            },
            {
                name : "Task2",
                date : "09/10/2024", 
                priority : "low", 
                completed : false 
            },
            {
                name : "Task3",
                date : "10/10/2024", 
                priority : "medium", 
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
        General3 : [],
        General4 : [],
        General5 : [],
        General6 : [],
        General7 : [],
        General8 : [],
        General9 : [],
        General10 : [],
        General11 : [],
        General12 : [],
        General13 : [],
        General14 : [],
        General15 : [],
        General16 : [],
        General17 : [],
        General18 : [],
        General19 : [],
        General20 : []
    });
    const [currentList, setCurrentList] = useState(Object.values(allTodoList)[0]);
    const [currentListName, setCurrentListName] = useState(Object.keys(allTodoList)[0]);
    const [prevListName, setPrevListName] = useState("");
    const [currentListIdx, setCurrentListIdx] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [demo, setDemo] = useState(null);
    
    // const [currentListItems, setCurrentListItems] = useState([])
    const [currentListCurrentItem, setCurrentListCurrentItem] = useState({
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

    function addCurrentList(listName) {
        console.log("Received list:", listName);
        if (listName in allTodoList) {
            setCurrentListName(listName);
            setCurrentList(allTodoList[listName]);
        }

    }

    
    function updateAllList(listName) {
        
    }

    useEffect(() => {
        console.log(allTodoList);
    }, [allTodoList]);

    useEffect(() => {
        console.log("currentList :" + currentList);
    }, [currentList]);

    // useEffect(() => {
    //     console.log("currentListName :" + currentListName);

    // }, [currentListName]);
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
            else if (currentListName !== "General Tasks" && currentListName in allTodoList) {
                console.log("currentListName :" + currentListName)
                setModalMsg("The List named "+currentListName+" already exists.")
                setShowModal(true);
            }
        }
        setPrevListName(currentListName); 
      }, [showTitleRenameInput]);


    function handleModal() {
        setShowModal(false);
        setModalMsg("");
        setCurrentList(allTodoList[currentListName])
    }

    function handleAddItemOnClick(index) {
        setExpanded(true);
        setCurrentListIdx(index);
    }

    function handleAddItemOnBlur() {
        setExpanded(false);
        setCurrentListIdx(null);
    }

    function handleTitleClick() {
        if (currentListName !== Object.keys(allTodoList)[0]) {
            setShowTitleRenameInput(true);
        }
    }

    const handleCurrentItemChange = (e) => {
        setDemo(e.target.value);
    };

    useEffect(() => {
        console.log("demo :" + demo);
    }, [demo]);

    
    const handleTitleInputChange = (e) => {
        setCurrentListName(e.target.value);
    };

    const handleTitleInputBlur = () => {
        setShowTitleRenameInput(false);
    };


    return(
        <div className="outer-container">
            <Navbar allList={allTodoList} sendBackListName={addNewList} sendCurrentListName={addCurrentList}/>
            
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

                <div className="list-items">
                    
                    <div className="add-list-name-btn" style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} onClick={() => handleAddItemOnClick(currentList.length)}>
                    + Add New Item
                    </div>

                    {currentList && currentList.map((item, index) => (
                        <div className={`show-list-item-btn ${currentListIdx === index ? 'expanded' : ''}`} 
                        style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '10px', marginBottom: index === currentList.length - 1 ? '50px' : '10px'}} 
                        onClick={() => handleAddItemOnClick(index)} 
                        tabIndex={0} 
                        key={index}
                        >
                        
                        <div className="item-name">
                            {item.name}
                            {expanded && currentListIdx === index && <MdOutlineExpandLess style={{marginLeft:'93%'}} onClick={(event) => { event.stopPropagation(); handleAddItemOnBlur(); }}/>}
                        </div>

                        {currentListIdx === index && (
                            <div className="current-item-info" style={{marginTop:'4%'}} >
                                {item.name}
                                <input className="edit-item-input"
                                    style={{height: '30px', borderRadius:'4px', width:'90%', marginTop:'10px'}} 
                                    type="text"
                                    onChange={handleCurrentItemChange}
                                    placeholder="Enter Task Name"
                                    autoFocus
                                />
                                
                                <div style={{marginTop:'24px'}}>{item.date}</div>
                                <label style={{height: '120%', width:'90%', marginTop:'8px'}} for="calendar">Select a date:</label>
                                <input style={{height: '30px', borderRadius:'4px', width:'90%', background:'grey'}} type="date" id="calendar" name="calendar"/>

                                <div style={{marginTop:'24px'}}>{item.priority}</div>
                                <fieldset style={{width:'90%', marginTop:'10px'}} >
                                    <legend>Select Priority:</legend>
                                    <label htmlFor="priority1">
                                    <input
                                        type="radio"
                                        id="priority1"
                                        name="language"
                                        value="High"
                                        // checked={selectedLanguage === 'javascript'}
                                        // onChange={handleLanguageChange}
                                    />
                                    High
                                    </label><br />
                                    <label htmlFor="priority2">
                                    <input
                                        type="radio"
                                        id="priority2"
                                        name="language"
                                        value="python"
                                        // checked={selectedLanguage === 'python'}
                                        // onChange={handleLanguageChange}
                                    />
                                    Medium
                                    </label><br />
                                    <label htmlFor="priority3">
                                    <input
                                        type="radio"
                                        id="language3"
                                        name="language"
                                        value="java"
                                        // checked={selectedLanguage === 'java'}
                                        // onChange={handleLanguageChange}
                                    />
                                    Low
                                    </label><br />
                                </fieldset>
                                <div>{item.completed}</div>
                            </div>
                        )} 
                        </div>

                    ))}

                </div>

            </div>

            {showModal && <Modal msgToDisplay={modalMsg} callbackFunc={handleModal}/>}
        </div>
    );
}

export default ToDo;
