import React from "react"

const Posts = ({apps}) =>{
   
    while(apps === undefined){
    return( 
       <div>Apps loading....</div>
    )
}
    return(
        <ul style={{textAlign:"center"}} className= "list-group mb-4">
        {apps.map(app=>(
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