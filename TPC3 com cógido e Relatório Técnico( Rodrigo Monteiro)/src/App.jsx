import { useState, useReducer } from "react";
import './App.css';

let nextId = 3;
const initialTasks = {
    tasks: [
        { id: 1, name: "Aprender useState", completed: false },
        { id: 2, name: "Criar exemplo prático", completed: true },
    ],
    filter: "all", // Opções: "all", "pending", "completed"
};
    


function TaskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { id: action.id, name: action.name, completed: false }
                ],
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.id
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case 'DELETETASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.id),
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.filter,
            };
        default:
            return state;
    }
}

function App() {
    /*const [tasks, setTasks] = useState([
        { id: 1, name: "Aprender useState", completed: false },
        { id: 2, name: "Criar exemplo prático", completed: true },
    ]);*/
    /*const [filter, setFilter] = useState("all"); // Opções: "all", "pending", "completed"*/
    
    const [state, dispatch] = useReducer(TaskReducer,initialTasks)
    const [newTaskName, setNewTaskName] = useState(" ");

   /* const addTask = () => {
        if (newTaskName.trim()) {
            const newTask = {
                id: Date.now(),
                name: newTaskName,
                completed: false,
            };
            setNewTaskName("");
        }
    };*/

     /*const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };*/

     /*const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };*/
    function handleAddTask (){
        if (newTaskName.trim()){
            dispatch({
                type: 'ADD_TASK', 
                id: nextId++, 
                name: newTaskName  
            })
            setNewTaskName("");
        }  
    }
   
    function handletoggleTask(id){
        dispatch({ type: 'TOGGLE_TASK', id: id })
    }

    function handleremoveTask(id){
        dispatch ({ type: 'DELETETASK', id: id})
    }

    const handleSetFilter = (filter) => {
        dispatch({ type: 'SET_FILTER', filter });
    };

     const filteredTasks = state.tasks.filter(task => {
        if (state.filter === "pending") return !task.completed;
        if (state.filter === "completed") return task.completed;
        return true;
    });

    return (
        <div className="main">
            <h1>Gerenciador de Tarefas</h1>
            <div>
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Nova tarefa"
                />
                <button onClick={handleAddTask}>Adicionar</button>
            </div>
            <div className="comandos">
                <button onClick={() => handleSetFilter("all")}>Todos</button>
                <button onClick={() => handleSetFilter("pending")}>Pendentes</button>
                <button onClick={() => handleSetFilter("completed")}>Concluídas</button>
            </div>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            {task.name}
                        </span>
                        <button onClick={() => handletoggleTask(task.id)}>
                            {task.completed ? "Desfazer" : "Concluir"}
                        </button>
                        <button onClick={() => handleremoveTask(task.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
