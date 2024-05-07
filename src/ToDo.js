import React, {useState, useEffect}  from "react";
import Navbar from './components/Navbar';

function ToDo() {
    const [allTodoList, setAllTodoList] = useState({
        "General" : [],
        "General1" : [],
        "General2" : [],
        "General3" : [],
        "General4" : [],
        "General5" : [],
        "General6" : [],
        "General7" : [],
        "General8" : [],
        "General9" : [],
        "General10" : [],
        "General11" : [],
        "General12" : [],
        "General13" : [],
        "General14" : [],
        "General15" : [],
        "General16" : [],
        "General17" : [],
        "General18" : [],

    });
    const [currentList, setCurrentList] = useState([]);

    function addNewList(listName) {
        console.log("Received list:", listName);

        if (!(listName in allTodoList)) {
            setAllTodoList(prevState => ({
                ...prevState, 
                [listName]: []
            }));
        }
    }

    useEffect(() => {
        console.log(allTodoList);
      }, [allTodoList]);

    return(
        <Navbar allList={allTodoList} sendBackListName={addNewList}/>
    );
}

export default ToDo;
