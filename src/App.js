import React, { useEffect, useState } from "react";
import "./App.css";
import { BsFillPencilFill } from "react-icons/bs";
import { FaCheck, FaTrash } from "react-icons/fa";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [edit, setEdit] = useState({
    item: {},
    isEdit: false,
  });

  const handleAddTodo = () => {
    let newTodoItem = {
      todo: newTodo,
    };
    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    let index = allTodos.indexOf(edit.item);
    if (edit.isEdit) {
      updateTodo(index, newTodo);
    } else {
      setAllTodos(updatedTodo);
    }
    setNewTodo("");
  };

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setAllTodos(reducedTodo);
  };

  const handleDeleteCompleted = (index) => {
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1);
    setCompletedTodo(reducedTodo);
  };

  const handleComplete = (index) => {
    let filteredItem = {
      ...allTodos[index],
    };
    let updatedCompletedTodo = [...completedTodo];
    updatedCompletedTodo.push(filteredItem);
    setCompletedTodo(updatedCompletedTodo);
    handleDelete(index);
  };

  const editTodo = (item, index) => {
    setEdit({
      item: item,
      isEdit: true,
    });
  };

  const updateTodo = (index, newTodo) => {
    setAllTodos((prevTodos) =>
      prevTodos.map((item, idx) =>
        idx === index ? { ...item, todo: newTodo } : item
      )
    );
    setEdit({
      item: {},
      isEdit: false,
    });
    setNewTodo("");
  };

  const deleteAllTodo = ()=>{
    setAllTodos([]);
  }

  useEffect(() => {
    setNewTodo(edit.item.todo);
  }, [edit]);

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Write any task here.."
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTodo}>
              Add Task
            </button>
          </div>
        </div>
        
          <div className="mid-section">
          <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active "}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active "}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>

          
        </div>
          <button className="clearBtn" onClick={()=>deleteAllTodo()}>
            Clear All
          </button>
          </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <h5>{item.todo}</h5>
                  <div>
                    <FaCheck className="icon" id="check" onClick={() => handleComplete(index)} />
                    <BsFillPencilFill className="icon" id="edit" onClick={() => editTodo(item, index)} />
                    <FaTrash className="icon" id="delete" onClick={() => handleDelete(index)} />
                  </div>
                </div>
              );
            })}
          {isCompleteScreen === true &&
            completedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <h5>{item.todo}</h5>
                  <div>
                    <FaTrash className="icon" id="delete" onClick={() => handleDeleteCompleted(index)} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;