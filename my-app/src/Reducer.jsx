let a={title:"",status:""}
export function reducer(state=a,action){
    switch(action.type){
        case "Title":
            return {...state,title:action.payload}
        case "Status":
            return {...state,status:action.payload}
        case "Clear":
            return {...state,title:"",status:""}
        default:
            return {title:"",status:""}
    }
}