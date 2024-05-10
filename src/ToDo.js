import React, {useState, useEffect}  from "react";
import Navbar from './components/Navbar';
import Form from "./components/Form";
import './styles/ToDo.css'


function ToDo() {
    const [showTitleRenameInput, setShowTitleRenameInput] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
            {
                name : "Task1",
                date : "", 
                priority : "", 
                completed : false 
            },
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
            
            if (prevListName in allTodoList && prevListName!==currentListName) {
                const updatedTodoList = { ...allTodoList };
                updatedTodoList[currentListName] = updatedTodoList[prevListName];
                delete updatedTodoList[prevListName];
                setAllTodoList(updatedTodoList);
            }
            
        }
        setPrevListName(currentListName); 
      }, [showTitleRenameInput]);

    function handleAddItemButtonClick() {
        setShowForm(true);
    }

    function handleClick() {
        // console.log('Current Title clicked!');
        if (currentListName !== Object.keys(allTodoList)[0]) {
            setShowTitleRenameInput(true);
        }
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
            
            <div className="list-items-container">
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
                </div>

                <div className="list-items">
                    
                    <div className="add-list-name-btn" style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} onClick={handleAddItemButtonClick}>
                    + Add New Item
                    </div>

                    {currentList && currentList.map((item, index) => (
                        <div className="show-list-item-btn" style={{paddingTop:'10px', paddingBottom:'25px', marginTop: '10px', marginBottom: index === currentList.length - 1 ? '50px' : '10px'}} onClick={handleAddItemButtonClick}>
                        {item.name}
                        </div>
                    ))}

                    {showForm && (
                        <Form />
                    )}
                </div>

            </div>


        </div>
    );
}

export default ToDo;
