import React from "react"

const Posts = ({apps}) =>{
   
    while(apps.data === undefined){
    return(
        
       <div>Apps loading....</div>
    )
}
    return(
        <div>{apps.data[0].name}</div>
    )
}

export default Posts