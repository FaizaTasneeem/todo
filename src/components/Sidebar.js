import React, {useState, useEffect} from "react";
import '../styles/Form.css'

function Form({curList, updateAllList, idxToAddOrEdit}) {
  return (
    <div>
        {curList.map((item, index) => {
            if (index === idxToAddOrEdit) {
                return (
                    <div key={index} className="show-form" style={{height:'60px', paddingTop:'10px', paddingBottom:'25px', marginTop: '10px', marginBottom: '10px'}}>
                        {item.name}
                    </div>
                );
            }
            return null; 
        })}
    </div>
)
}

export default Form;
