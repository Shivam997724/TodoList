import React, { useEffect, useState } from 'react';
import "./Todos.css"


export default function Todo() {

  let  localdata = ()=>{
    let old = localStorage.getItem("mydata")
    if(old){
      return JSON.parse(old)
    }
    else{
      return []
    }
  }
  const [task, setTask] = useState("");
  const [data, setData] = useState(localdata());
  const [extradata, setextraData] = useState(localdata());
  const [update ,setupdate]=useState( {isup:false,id:""})


  let addtask = (e) => {
    e.preventDefault();
    if(!task){
      alert("please enter task")
    }
    else{
      if(update.isup){
        let newup = data.map((v,i)=>{
          if(v==data[update.id]){
            return {...v,task}
          }
          else{
            return v
          }
        })
        setData(newup)
        setextraData(newup)
        setupdate({isup:false  , id:""})
      }
      else{
        setData([...data, { task }])
        setextraData([...data, { task }])
        setTask("")
      }
    }
  }
    let search= (e)=>{
      e.preventDefault();
      let searchTask =  document.getElementById("search").value;
      setextraData(data.filter((a)=>{
        return (a.task.includes(searchTask))

      }))


    }
  
    useEffect(()=>{
      localStorage.setItem("mydata",JSON.stringify(data))
    },[data])
    
    let updated =(i)=>{
      setupdate({isup:true,id:i})
      setTask(data[i].task)

    }
  
  let deleted =(i)=>{
    let copy = data
    copy.splice(i,1);
    setData([...data]);
    setextraData([...data]);
  }

  

  return (
      <>
      <form className='search' >
        <h1 className='Head text-center '>TO-DO APP</h1>
        <div>
          <div className="input-group  input-group-lg w-75 mx-auto mt-4">
            <input type="text" className="input border-0 form-control mb-2 bg-warning-subtle text-dark  rounded-2" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder='enter task' />
            <span ><button className='button' type="submit" onClick={addtask}  >Add Task</button></span>
            <input type="text" id="search" className="input border-0 form-control mb-2 bg-warning-subtle text-dark mx-2  rounded-2" placeholder='search task'/>
            <span onClick={search} className='my-auto mx-2 bg-warning-subtle rounded-2' ><i className="fa-solid fa-2x fa-magnifying-glass"></i></span>
            <span  className='my-auto bg-warning-subtle rounded-2' onClick={()=>{setextraData(data)}}><i className="fa-solid fa-2x fa-arrow-rotate-right"></i></span>
          </div>
        </div>
      </form>
      <div className='list-container'>
        <h1 className='list text-center'>TO-DO LIST</h1>
<div>

        {extradata.map((v, i) => {
          return (

            <div key={i} className=' list-unstyled  w-75 m-auto my-3 text-dark d-flex'>
            <li className='count'>{i+1}</li>
            <li className='task d-flex'><h2>{v.task}</h2><span className='my-auto mx-4' onClick={()=>{updated(i)}}><i className="fa-solid fa-2x fa-pen-to-square"></i></span> <span className='my-auto' onClick={()=>{deleted(i)}}><i className="fa-solid fa-2x fa-trash fa "></i></span></li>

          </div>
            )
        })}
        </div>

      </div>
  
    </>
  )
  
}
