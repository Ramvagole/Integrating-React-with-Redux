
export function submit(data,fetchData){
    if(data.title!=="" && data.status!==""){
        fetch("http://localhost:3000/posts",{
            method:"POST",
            body:JSON.stringify(data)
        }).then((res)=>res.json).then(()=>{fetchData()})
    }else{
        alert("Enter the value")
    }
}

export function remove(id,fetchData){
    fetch(`http://localhost:3000/posts/${id}`,{
        method:"DELETE"
    }).then((res)=>res.json()).then((res)=>{fetchData()})

}
export function update(id,data,setEdit,fetchData){
    fetch(`http://localhost:3000/posts/${id}`,{
        method:"PATCH",
        body:JSON.stringify(data)
    }).then(()=>{
        setEdit({id:"",isopen:false,data:{title:"",status:""}})
        fetchData()
    })
}