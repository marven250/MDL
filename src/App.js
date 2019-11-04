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
                  start: 1,
                  end: 100,
                  max: 50,
                  order: "asc"
    }
  }


  componentDidMount() {
    const fetchApps = async () => {
      const res = await axios.get("https://mdlive-api.herokuapp.com/apps")
      this.setState({ data: res.data.data })
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
    const appsPerPage = 5
    const indexOfLastApp = currentPage * appsPerPage
    const indexOfFirstApp = indexOfLastApp - appsPerPage
    const currentApps = this.state.data.slice(indexOfFirstApp, indexOfLastApp)

  
    let arrange = (e)=>{
      e.preventDefault()
      let byValue = document.getElementById("by").value
      console.log("byValue", byValue)
      let startValue = document.getElementById("start").value
      console.log("startValue", startValue)
      let endValue = document.getElementById("end").value
      console.log("endValue", endValue)
      let maxValue = document.getElementById("max").value
      console.log("maxValue", maxValue)
      let orderValue = document.getElementById("order").value
      console.log("orderValue", orderValue)
      this.setState({
        key: byValue,
        start: startValue,
        end: endValue,
        max: maxValue,
        order: orderValue
      })
    }

  return (
    <div className= "container" >
    <h1 className= "text-primary mb-4">MDLive Application Pagination</h1>
      <Posts key= {this.state.key} apps={currentApps} />
      <Pagination paginate= {paginate} appsPerPage= {appsPerPage} totalApps= {this.state.data.length} />
      <form onSubmit={arrange} style= {{width: "30%", position: "fixed", right: "1%", top: "0%"}}>
        <h3 style= {{textAlign: "center"}} className="text-primary mb-4">Range</h3>
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
        <input className="form-control" id="submit" type="submit" value="submit"></input>
      </form>
    </div>
  );
    }
}

