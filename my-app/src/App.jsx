import { useEffect, useState } from 'react'

import './App.css'
import { submit,remove,update} from './Submit'
import {useSelector,useDispatch} from "react-redux"
function App() {
  let tit=useSelector(state=>state)
  let disp=useDispatch()
  let [a,setVal]=useState([])
  let [isEdit,setEdit]=useState({id:"",isopen:false,data:{title:"",status:""}})
  function fetchData(){
    disp({type:"nothing"})
    
    fetch("http://localhost:3000/posts").then((res)=>res.json()).then((res)=>{setVal(res)}).catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
      <h1>Todod list</h1>
      <div style={{display:"flex",flexDirection:"column"}}>
        <input style={{width:"300px",height:"25px",marginTop:"15px"}} type='text' placeholder='Enter the title..' value={tit.title} onChange={(e)=>disp({type:"Title",payload:e.target.value})} />
        <select style={{width:"307px",height:"25px",marginTop:"15px"}} value={tit.status} onChange={(e)=>disp({type:"Status",payload:e.target.value})}>
          <option value="">Select</option>
          <option value="not completed">not completed</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>
        <button style={{marginTop:"15px",backgroundColor:"blue",color:"white"}} onClick={()=>submit(tit,fetchData)}>Submit</button>
      </div>
      {
        a.map((v,i)=>{

          return (isEdit.isopen && v.id===isEdit.id)?(
              <div key={i} style={{display:"flex",flexDirection:"column"}}>
                <input style={{width:"300px",height:"25px",marginTop:"15px"}} type='text' placeholder='Enter the title..' value={isEdit.data.title} onChange={(e)=>setEdit({...isEdit,data:{...isEdit.data,[e.target.name]:e.target.value}})} name='title'/>
                <select style={{width:"307px",height:"25px",marginTop:"15px"}} onChange={(e)=>setEdit({...isEdit,data:{...isEdit.data,status:e.target.value}})}>
                  <option value="">select</option>
                  <option value="not completed">not completed</option>
                  <option value="pending">pending</option>
                  <option value="completed">completed</option>
                </select>
                <button style={{marginTop:"15px",backgroundColor:"orange",color:"white"}} onClick={()=>update(v.id,isEdit.data,setEdit,fetchData)}>Update</button>
              </div>):(
              <div key={i} style={{border:"1px solid black",marginTop:"35px"}}>
                <h3>Title:{v.title}</h3>
                <h3>Status:{v.status}</h3>
                <button onClick={()=>remove(v.id,fetchData)}>delete</button>
                <button onClick={()=>setEdit({id:`${v.id}`,isopen:true,data:{title:`${v.title}`,status:`${v.status}`}})}>Edit</button>
              </div>
            )
        })
      }
    </>
  )
}

export default App
