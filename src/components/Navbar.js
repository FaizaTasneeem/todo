import React, {useState, useEffect} from "react";
import { RxCross2 } from "react-icons/rx";
import '../styles/Navbar.css'
import Modal from "./Modal";

function Navbar({allList, funcToAddList, funcToDeleteList, sendCurrentListName}) {
    let allListNames = Object.keys(allList);
    
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [deleteListName, setDeleteListName] = useState("");
    const [curListIdx, setCurListIdx] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalButtonMsg, setModalButtonMsg] = useState([]);
  
    const handleButtonClick = () => {
      setShowInput(true);
    };
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleInputBlur = () => {
      setShowInput(false);
    };

    function handleHover(index) {
      setShowButton(true);
      setCurListIdx(index);
    }

    function setDeleteListModalItems() {
      setShowModal(true);
      setModalButtonMsg(["Yes", "No"]);
      setModalMsg("Are you sure you want to delete this List?")
    }

    function handleModal() {
      setShowModal(false);
      setModalMsg("");
      setModalButtonMsg([]);
    }

    function handleDeleteList(index) {
      console.log("list to be sent to delete: ", allListNames[index]);    
      setDeleteListName(allListNames[index]);
      setShowModal(false);
      setModalMsg("");
      setModalButtonMsg([]);
    }

    useEffect(() => {
      if(inputValue && !showInput) {
        funcToAddList(inputValue);
      }
    }, [showInput]);

    useEffect(() => {
      funcToDeleteList(deleteListName);
    }, [deleteListName]);

    
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
                index > 0 && (

                  <button className='list-names' 
                  key={index} 
                  style={{paddingTop:'15px', paddingBottom:'25px', marginBottom: index === allListNames.length - 1 ? '50px' : '5px'}} 
                  onClick={() => sendCurrentListName(listName)}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => setShowButton(false)}
                  >
                    {listName}
                    {curListIdx==index && showButton && 
                      <RxCross2 
                        onClick={setDeleteListModalItems} 
                        style={{
                          position: 'absolute', 
                          marginLeft: '45px'
                        }}
                      />}
                  </button>
                )
            ))}
            {showModal && 
                <Modal 
                    msgToDisplay={modalMsg} 
                    handleModal={handleModal} 
                    buttonMsgsList={modalButtonMsg} 
                    deleteItemFunc={handleDeleteList} 
                    curItemIdx={curListIdx} 
                />}
        </div>
    );
}


export default Navbar;
