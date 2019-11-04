import React from "react"

const Posts = (propss) =>{
   
    while(propss.apps === undefined){
    return( 
       <div>Apps loading....</div>
    )
}
        

    if(propss.identification === "id"){
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
} else{
    return(
        <ul style={{ textAlign: "center" }} className="list-group mb-4">
            {propss.apps.map(app => (
                <li className="list-group-item" key={app.id} style={{ display: "flex", justifyContent: "center", width: "300px" }}>
                    Name: {app.name}     
                    <br></br>
                    ID: {app.id}
                </li>
            ))}
        </ul>
    )
}
}
export default Posts