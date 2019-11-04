import React from 'react';
// import {Route, Switch} from "react-router-dom"
// import ApiDisplay from "./Components/ApiDisplay"
import Posts from "./Components/posts"
import axios from "axios"
import Pagination from "./Components/pagination"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentPage: 1,
                  key: "id",
                  start: 0,
                  end: 99,
                  max: 50,
                  order: "asc",
                  reversedData: []
    }
  }


  componentDidMount() {
    const fetchApps = async () => {
      const res = await axios.get("https://mdlive-api.herokuapp.com/apps")
      const res2 = await axios.get("https://mdlive-api.herokuapp.com/apps")
      console.log(res)
      let reverse = res2.data.data.reverse()
      this.setState({ data: res.data.data,
              reversedData: reverse
      })
      
      
      //(res => res.json())
      //  .then(response => {
      //  this.setState({ data: response.data })
      // console.log(this.state)
      // })
      // console.log(this.state)
    }
    fetchApps()
  }


  
  render(){
    while (this.state.data === undefined) {
      return (
        <div>Apps loading....</div>
      )
    }

    const paginate = pageNumber => {
      this.setState({currentPage:pageNumber})
    }
    var currentPage= this.state.currentPage
    const appsPerPage = this.state.max
    const indexOfLastApp = currentPage * appsPerPage
    const indexOfFirstApp = indexOfLastApp - appsPerPage

    var currentApps 
    // if (this.state.order === "asc") {
    //   currentApps = this.state.data.slice(this.state.start, this.state.end).slice(indexOfFirstApp, indexOfLastApp);
    // }

    let starter =this.state.start
    let ender = this.state.end

    if (this.state.order === "desc"){
      if(starter === -1) starter = 0
     currentApps= this.state.reversedData.slice(starter, ender).slice(indexOfFirstApp, indexOfLastApp);
    }else{
      if (starter === -1) starter = 0
      currentApps = this.state.data.slice(starter, ender).slice(indexOfFirstApp, indexOfLastApp);
    }
    
    

    let arrange = (e)=>{
      e.preventDefault()
      let byValue = document.getElementById("by").value
     // console.log("byValue", byValue)
      let startValue = document.getElementById("start").value
     // console.log("startValue", startValue)
      let endValue = document.getElementById("end").value
     // console.log("endValue", endValue)
      let maxValue = document.getElementById("max").value
     // console.log("maxValue", maxValue)
      let orderValue = document.getElementById("order").value
     // console.log("orderValue", orderValue)
      this.setState({
        key: byValue,
        start: (startValue-1) || 0,
        end: endValue || 99,
        max: maxValue || 50,
        order: orderValue
      })
    }

  return (
    <div className= "container" >
    <h1 className= "text-primary mb-4">MDLive Application Pagination</h1>
      <Posts start={this.state.start} end= {this.state.end} order={this.state.order} identification= {this.state.key} apps={currentApps} />
      <Pagination paginate= {paginate} appsPerPage= {appsPerPage} totalApps= {this.state.data.length} />
      <form  style= {{width: "30%", position: "fixed", right: "1%", top: "8%"}}>
         <h3 style= {{textAlign: "center"}} className="text-primary mb-4">Params/Range</h3>
        <label className="input-group-text" for= "by">by:</label>
        <select className="form-control" id="by">
            <option>id</option>
            <option>name</option>
        </select>
        <label className="input-group-text" for= "start">start: </label>
        <input className="form-control"  id="start" type="number"></input>
        <label className="input-group-text" for= "end">end: </label>
        <input className="form-control" id="end" type="number"></input>
        <label className="input-group-text" for= "max">max: </label>
        <input className="form-control" id= "max" type="number"></input>
        <label className="input-group-text" for="order">order: </label>
        <select className="form-control" id="order">
          <option>asc</option>
          <option>desc</option>
        </select>
        <input onClick={arrange} className="input-group-text" id="submit" type="submit" name="submit"></input>
        {/* <label  for="submit">Double Click 'submit' button To Update Range</label> */}
      </form>
    </div>
  );
    }
}

