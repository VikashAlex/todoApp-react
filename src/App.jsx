import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const[todo,setTodo]=useState("")
  const getData = localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
  const [todos,setTodos]=useState(getData)
  
  const clickHandel = (e)=>{
    e.preventDefault()
    const obj ={
      todo,
      isStatus:false
    }
    if (todo!=="") {
      const newData =[...todos,obj]
      localStorage.setItem("list",JSON.stringify(newData))
      setTodos(newData)
      setTodo("")
      toast.success("Data Add Successfully !")
    }
    else{
      e.target.input.focus()
      toast.error("Please fill this filed")
    }
  }
  const dlt =(index)=>{
    const dltUpdate = todos.filter((item,i)=>{
      return index!==i
    })
    localStorage.setItem("list",JSON.stringify(dltUpdate))
    setTodos(dltUpdate)
    toast.warning("Data Delete Successfully !")
  }
  const edit = (index)=>{
    const editUpdate = todos.map((item,i)=>{
      if (index===i) {
        return {...item,isStatus:!item.isStatus}
      }
      else{
        
        return item
      }
    })
    localStorage.setItem("list",JSON.stringify(editUpdate))
    setTodos(editUpdate)
    toast.info("Data edit successfully !")
    
  }
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <ToastContainer />
      <div
        className="todo-container p-4 rounded"
        style={{ maxWidth: "500px", width: "100%", backgroundColor: "#2c2f4a" }}
      >
        <div className="todo-header text-center mb-4">
          <h2 className="text-warning fw-bold ">
            <i className="fas fa-skull-crossbones me-2"></i>
             To-Do App 
           <i className="fas fa-skull-crossbones ms-2"></i>
          </h2>
        </div>

        <div className="mb-4">
          <form className='input-group' onSubmit={clickHandel}>
          <input
            name='input'
            type="text"
            value={todo}
            onChange={(e)=>{setTodo(e.target.value)}}
            className="form-control text-black"
            placeholder="Naya task likho..."
            style={{ backgroundColor: "#fff", border: "none"  }}
            />
          <button className="btn btn-warning">
            <i className="fas fa-plus"></i>
          </button>
          </form>
        </div>

        <ul className="list-group">
         {todos.map((item,i)=>{
          return(
            <li key={i}
            className={item.isStatus==true?"list-group-item d-flex justify-content-between align-items-center mb-2 text-decoration-line-through":"list-group-item d-flex justify-content-between align-items-center mb-2"}
            style={{ backgroundColor: "#3c3f58", border: "none", color: "white" }}
          >
            <div className='d-flex align-items-center gap-2 fw-bold text-capitalize'>
              <input type="checkbox" defaultChecked={item.isStatus==true?true:false} className='form-check-input' onClick={()=>{edit(i)} } />
              {item.todo}
            </div>
            <div>
              <i className="fas fa-trash text-danger" onClick={()=>{dlt(i)}}></i>
            </div>
          </li>
          )
         })}
        </ul>
      </div>
    </div>
  )
}

export default App