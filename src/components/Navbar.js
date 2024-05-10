import React, {useState, useEffect} from "react";
import '../styles/Navbar.css'

function Navbar({allList, sendBackListName, sendCurrentListName}) {
    let allListNames = Object.keys(allList);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
  
    const handleButtonClick = () => {
      setShowInput(true);
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleInputBlur = () => {
      setShowInput(false);
    //   setInputValue("")
    };

    useEffect(() => {
        if(inputValue && !showInput) {
            sendBackListName(inputValue);
        }
      }, [showInput]);

    
    return (
        <div className="nav-container">
            <h1 style={{marginTop: '25px', marginBottom: '35px'}} >BeREACTive</h1>
            <button className='list-names' style={{paddingTop:'15px', paddingBottom:'25px'}} key='0' onClick={() => sendCurrentListName(allListNames[0])}>{allListNames[0]}</button>
            {!showInput && (
            <button className="add-list-button" style={{paddingTop:'15px', paddingBottom:'25px', marginTop: '50px', marginBottom: '50px'}} onClick={handleButtonClick}>
            + Add New List
            </button>
            )}
            {showInput && (
                <div className="add-list-form">
                <input className="add-list-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter List Name"
                    autoFocus
                />
                </div>
            )}
            {allListNames.map((listName, index) => (
                index > 0 && <button className='list-names' style={{paddingTop:'15px', paddingBottom:'25px', marginBottom: index === allListNames.length - 1 ? '50px' : '5px'}} key={index} onClick={() => sendCurrentListName(listName)}>{listName}</button>
            ))}
            {/* <h3 style={{marginTop: '50px', color: 'white'}} >{inputValue}</h3> */}
        </div>
    );
}


export default Navbar;
