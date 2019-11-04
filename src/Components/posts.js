import React from "react"

const Posts = (propss) =>{
   
    while(propss.apps === undefined){
    return( 
       <div>Apps loading....</div>
    )
}
console.log(propss)
    return(
        <ul style={{textAlign:"center"}} className= "list-group mb-4">
        {propss.apps.map(app=>(
            <li className= "list-group-item" key={app.id} style= {{display:"flex", justifyContent:"center", width:"300px"}}>
                ID: {app.id}
                <br></br>
                Name: {app.name}
            </li>
        ))}
        </ul>
    )
}

export default Posts