import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  const [showfinished, setshowfinished] = useState(false)

  const [isFirstRender, setIsFirstRender] = useState(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
    setIsFirstRender(false)
  }, [])

  useEffect(() => {
    if (!isFirstRender) {

      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isFirstRender])


  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)


  }

  const togglefinished = () => {
    setshowfinished(!showfinished)
  }


  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)

  }



  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos);


  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos,)

  }



  return (
    <>
      <Navbar />
      <div className="md:container">
        <div className='bg-purple-600/50 md:h-170 max-md:w-230 max-md:h-400 w-300 md:ml-90 mt-20 rounded-xl max-md:mr-400  '>
          <h1 className='text-5xl max-md:text-[100px] font-semibold text-white mb-8 pt-3 text-center drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]'>To-do List</h1>
          <div className='flex  gap-6 justify-center items-center text-[50px]'>
            <input onChange={handleChange} value={todo} className='bg-white/20 border border-white/30 backdrop-blur-md max-md:w-130 max-md:h-25
    placeholder-gray-200 text-white rounded-2xl w-80 h-12 pl-5
    focus:outline-none focus:ring-2 focus:ring-purple-400 transition ' placeholder='Add your tasks here' type="text" name="add" id="addtodo" />
            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-purple-500/50 border border-purple-300/20 
    rounded-2xl px-6 h-12 text-white font-medium 
    hover:bg-purple-600/70 hover:shadow-[0_0_15px_#a855f7] 
    disabled:opacity-50 transition'>Save</button>
          </div>
          <label className="text-white max-md:text-[39px]  text-[23px] flex justify-center items-center mt-4 mr-90">
            <input className='h-5 w-10 max-md:w-10 max-md:mr-4 max-md:h-13 pt-20 accent-purple-700' onChange={togglefinished} type="checkbox" checked={showfinished} /> Show Finsihed

          </label>
          <div className="contianer2 overflow-y-scroll bg-white/55 w-160 h-100 flex rounded-xl md:ml-[311px] max-md:ml-[145px] max-md:h-300 mt-4 backdrop-blur-lg border border-white/20 shadow-inner">
            <div className={`todos ${todos.length === 0 && "flex flex-col items-center ml-45"}`}>
              {todos.length === 0 && <div className='w-70 h-70'><img src="src/assets/empty.jpg" alt="" /></div>}
              {todos.length === 0 && <div className='text-2xl '>Your Todo list is empty</div>}
              {todos.map(item => {


                return (showfinished || !item.isCompleted) && <div key={item.id} className='todo flex justify-between items-center 
  rounded-2xl border border-purple-500/30 
  bg-purple-600/26 backdrop-blur-md shadow-lg 
  hover:bg-purple-600/10 hover:shadow-purple-500/40 
  transition-all duration-300 p-4 mt-2 ml-2'>
                  <input className='checkbox flex accent-purple-700 justify-center items-center mt-5 ml-4' onChange={handlecheckbox} name={item.id} type="checkbox" checked={item.isCompleted} id="" />
                  <div className='flex justify-between items-center w-139'>

                    <div className={`text  flex justify-center items-center h-10 mt-4 ml-4 ${item.isCompleted ? "line-through" : ""}`}> {item.todo}</div>
                    <div className='buttons flex justify-center'>

                      <button onClick={(e) => handleEdit(e, item.id)} className='edit h-8 text-[20px] w-12 flex justify-center items-center bg-purple-800 rounded-md text-white font-bold mx-1 mt-5 ml-4 cursor-pointer hover:bg-purple-900'><MdEdit /></button>
                      <button onClick={(e) => { handleDelete(e, item.id) }} className='edit h-8 text-[20px] flex justify-center items-center w-16 cursor-pointer hover:bg-purple-900 bg-purple-800 rounded-md text-white font-bold mx-1 mt-5'><MdDeleteForever /></button>
                    </div>
                  </div>
                </div>
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
