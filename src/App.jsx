import { useEffect, useState } from 'react'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

import './App.css'

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false)
  const [allTodos,setAllTodos]=useState(Array(0).fill(""))
  const [newTitle,setNewTitle]=useState("")
  const [newDescription,setNewDescription]=useState("")
  const [completedTodos,setCompletedTodos]=useState([])
  const [currentDate, setCurrentDate] = useState(new Date())


  function formatDate(date) {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      millisecond: 'numeric' 
    };
    return new Date(date).toLocaleString('en-US', options);
  }

  const handleaddtodo = ()=>{
    let newTodoItem = {
      Title : newTitle ,
      Description : newDescription
    }

    let updatedTodoArray=[...allTodos]
    updatedTodoArray.push(newTodoItem)
    setAllTodos(updatedTodoArray)

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArray))
    setNewTitle("")
    setNewDescription("")
  }

  const handleToDelete =(index) =>{
    let reducedTodo=[...allTodos]
   
    reducedTodo.splice(index,1)
    localStorage.setItem('todolist',JSON.stringify(reducedTodo))
    setAllTodos(reducedTodo)

  }

  const handleToDeletecompleted = (index)=>{
    let reducedcomletedTodo=[...completedTodos]
    reducedcomletedTodo.splice(index,1)
    localStorage.setItem('completedTodo',JSON.stringify(reducedcomletedTodo))
    setCompletedTodos(reducedcomletedTodo)
  }

  const handleToComplete = (index)=>{
    let now= new Date()
    let dd = now.getDate()
    let mm = now.getMonth() +1 
  let yyyy = now.getFullYear()
    let h  = now.getHours()
    let m  = now.getMinutes()
    let s  = now.getSeconds()
    let completedon = dd +'/'+mm+'/'+yyyy + ' at : '+h+':'+m+':'+s

    let filtredItem = {
      ...allTodos[index],
      completedOn:completedon
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filtredItem)
    setCompletedTodos(updatedCompletedArr)
    /* let tasktab=[...allTodos]
    tasktab.splice(index)
    setAllTodos(tasktab)*/
    // Orsimply : 
    handleToDelete(index)

    localStorage.setItem('completedTodo',JSON.stringify(updatedCompletedArr))

   
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1); // Update every millisecond

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);



  useEffect(()=>{
      let SavedTodo = JSON.parse(localStorage.getItem('todolist'))
      let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodo'))

      if(SavedTodo){
        setAllTodos(SavedTodo)
      }
      if(savedCompletedTodos){
        setCompletedTodos(savedCompletedTodos)
      }

      
  },[])
  
 return (
  <div className='App'>
   <div className='Date' >{formatDate(currentDate)}</div>
  <div className='todo-wrapper'>
    <div className="todo-input">
        <div className='todo-input-item'>
          <label > Title </label>
          <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='What is the task title ?'/>
        </div>
        <div className='todo-input-item'>
          <label > Description </label>
          <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='Describe your task'/>
        </div>
        <div className='todo-input-item'>
          <button type='button' onClick={handleaddtodo} className='primaryBtn'> Add </button>          
        </div>

    </div>
    <div className='btn-area'>
      <button className={`isCompleteScreen ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>ToDo</button>
      <button className={`isCompleteScreen ${isCompleteScreen === true && 'active'}`}  onClick={()=>setIsCompleteScreen(true)}>Completed</button>

    </div>

    <div className='todo-list'> 
       
        {isCompleteScreen===false && allTodos.map((item,index)=>{
          return(

            <div>
            <div className='todo-list-item' key={index}>
          
            <div >
              <h3>{item.Title}</h3>
              <p>{item.Description}</p>
            </div>

            <div className='icon-container'>
                <MdOutlineDeleteSweep className='icon' onClick={()=>handleToDelete(index)} title='Delete task ?' />
                <FaRegCheckCircle className='checkicon' onClick={()=>handleToComplete(index)} title='Submit task ?'/>

              </div>
        </div>
        </div>
          )
        }
        
        
        )}
        

    </div>

    <div className='todo-list'> 
       
        {isCompleteScreen===true && completedTodos.map((item,index)=>{
          return(

            <div>
            <div className='todo-list-item' key={index}>
          
            <div >
              <h3>{item.Title}</h3>
              <p>{item.Description}</p>
              <p><small>Completed on : {item.completedOn}</small></p>
            </div>

            <div className='icon-container'>
                <MdOutlineDeleteSweep className='icon' onClick={()=>handleToDeletecompleted(index)} title='Delete task ?' />

              </div>
        </div>
        </div>
          )
        }
        
        
        )}
        

    </div>

  </div>
  </div>
 )
}

export default App
