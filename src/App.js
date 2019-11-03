import React from 'react';
// import {Route, Switch} from "react-router-dom"
// import ApiDisplay from "./Components/ApiDisplay"
import Posts from "./Components/posts"
import axios from "axios"
import Pagination from "./Components/pagination"


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {currentPage: 1}
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
      console.log(currentPage)
    }
    var currentPage= this.state.currentPage
    const appsPerPage = 5
    const indexOfLastApp = currentPage * appsPerPage
    const indexOfFirstApp = indexOfLastApp - appsPerPage
    const currentApps = this.state.data.slice(indexOfFirstApp, indexOfLastApp)

    
  return (
    <div className= "container" >
    <h1 className= "text-primary mb-4">MDLive Application Pagination</h1>
      <Posts apps={currentApps} />
      <Pagination paginate= {paginate} appsPerPage= {appsPerPage} totalApps= {this.state.data.length} />
    </div>
  );
    }
}

