import React, {useState, useEffect}  from "react";
import Navbar from './components/Navbar';
import './styles/ToDo.css'


function ToDo() {
    const [showTitleRenameInput, setShowTitleRenameInput] = useState(false);
    const [allTodoList, setAllTodoList] = useState({
        General : [],
        General1 : [],
        General2 : [
            {
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task2",
                date : "", 
                priority : "", 
                completed : false 
            }
        ],
        // General3 : [],
        // General4 : [],
        // General5 : [],
        // General6 : [],
        // General7 : [],
        // General8 : [],
        // General9 : [],
        // General10 : [],
        // General11 : [],
        // General12 : [],
        // General13 : [],
        // General14 : [],
        // General15 : [],
        // General16 : [],
        // General17 : [],
        // General18 : [],
        // General19 : [],
        // General20 : []
    });
    const [currentList, setCurrentList] = useState(allTodoList[0]);
    const [currentListName, setCurrentListName] = useState(Object.keys(allTodoList)[0]);
    const [prevListName, setPrevListName] = useState("");
    
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

    useEffect(() => {
        console.log(allTodoList);
    }, [allTodoList]);

    // useEffect(() => {
    //     console.log(currentListName);

    // }, [currentListName]);
    useEffect(() => {
        setPrevListName(currentListName);
        if(currentListName && !showTitleRenameInput) {
            console.log(currentListName)
            console.log(showTitleRenameInput)
            console.log(prevListName)

            if (prevListName in allTodoList && prevListName!==currentListName) {
                console.log(prevListName)
                const updatedTodoList = { ...allTodoList };
                updatedTodoList[currentListName] = updatedTodoList[prevListName];
                delete updatedTodoList[prevListName];
                setAllTodoList(updatedTodoList);
            }

        }
      }, [showTitleRenameInput]);

    function handleAddItemButtonClick() {

    }

    function handleClick() {
        // console.log('Current Title clicked!');
        if (currentListName !== Object.keys(allTodoList)[0])
        setShowTitleRenameInput(true);
    }

    const handleInputChange = (e) => {
        setCurrentListName(e.target.value);
    };

    const handleInputBlur = () => {
        setShowTitleRenameInput(false);
    };

    return(
        <div className="outer-container">
            <Navbar allList={allTodoList} sendBackListName={addNewList} sendCurrentListName={addCurrentList}/>
            <div className="list-name">
                <div onClick={handleClick}><h1>{currentListName}</h1></div>
                {showTitleRenameInput && (
                    <input className="add-list-name-input"
                        type="text"
                        value={currentListName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        autoFocus
                    />
                )}
                <button className="add-list-name-btn" style={{paddingTop:'15px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} onClick={handleAddItemButtonClick}>
                + Add New Item
                </button>
            </div>
        </div>
    );
}

export default ToDo;
