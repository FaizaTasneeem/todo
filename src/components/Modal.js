import React from "react";
import '../styles/Modal.css';

function Modal({msgToDisplay, titleRenameFunc, buttonMsgsList, deleteItemFunc, curItemIdx}) {

    return(
        <div className="modal-container">
            <div className="modal-content">
                <div style={{color:'white', marginTop:'5%'}}><h3>{msgToDisplay}</h3></div>
                <div className="buttons">
                    {buttonMsgsList.length === 1 && <button className='modal-close-button' onClick={titleRenameFunc}>{buttonMsgsList[0]}</button>}
                </div>
                    {buttonMsgsList.length === 2 && (
                        <div className="buttons">
                            <button className='modal-close-button' onClick={() => deleteItemFunc(curItemIdx)}>{buttonMsgsList[0]}</button> 
                            <button className='modal-close-button' onClick={titleRenameFunc}>{buttonMsgsList[1]}</button>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Modal;
