import React from "react";
import '../styles/Modal.css';

function Modal({msgToDisplay, callbackFunc}) {
    return(
        <div className="modal-container">
            <div className="modal-content">
                <div style={{color:'white', marginTop:'5%'}}><h3>{msgToDisplay}</h3></div>
                <button className='modal-close-button' onClick={callbackFunc}>OK</button>
            </div>
        </div>
    );
}

export default Modal;
