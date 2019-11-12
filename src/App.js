import React from "react";
import Posts from "./Components/posts";
import axios from "axios";
import Pagination from "./Components/pagination";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      key: "id",
      start: 0,
      end: 100,
      max: 50,
      order: "asc",
      reversedData: []
    };
  }

  // Fetching data (asc and desc) from api and storing in state
  componentDidMount() {
    this.fetchApps = async () => {
      const res = await axios.get("https://mdlive-api.herokuapp.com/apps");
      let reverse = [...res.data.data];
      this.setState({
        data: res.data.data,
        reversedData: reverse.reverse()
      });
    };
    this.fetchApps();
  }

  render() {
    // Safety precaution to avoid app from breaking
    while (this.state.data === undefined) {
      return <div>Apps loading....</div>;
    }

    //Line 41-43 is passed in as a prop to the pagination component

    const paginate = pageNumber => {
      this.setState({ currentPage: pageNumber });
    };
    let currentPage = this.state.currentPage;
    const appsPerPage = this.state.max;
    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    let currentApps;

    let starter = this.state.start;
    let ender = this.state.end;

    //Line 55-65 takes care of asc/des and start/end params in app
    if (this.state.order === "desc") {
      if (starter <= -1) starter = 0;
      if (ender <= 0) ender = this.state.data.length;
      currentApps = this.state.reversedData
        .slice(starter, ender)
        .slice(indexOfFirstApp, indexOfLastApp);
    } else {
      if (starter <= -1) starter = 0;
      if (ender <= 0) ender = this.state.data.length;
      currentApps = this.state.data
        .slice(starter, ender)
        .slice(indexOfFirstApp, indexOfLastApp);
    }

    //In line 70-84, the arrange function gets the the user inputs for the range/params section of the app
    let arrange = e => {
      e.preventDefault();
      let byValue = document.getElementById("by").value;
      let startValue = document.getElementById("start").value;
      let endValue = document.getElementById("end").value;
      let maxValue = document.getElementById("max").value;
      let orderValue = document.getElementById("order").value;
      this.setState({
        key: byValue,
        start: startValue - 1 || 0,
        end: endValue || 99,
        max: maxValue || 50,
        order: orderValue
      });
    };

    return (
      <div className="container">
        <h1 className="text-primary mb-4">MDLive Application Pagination</h1>
        <Posts
          start={this.state.start}
          end={this.state.end}
          order={this.state.order}
          identification={this.state.key}
          apps={currentApps}
        />
        <Pagination
          paginate={paginate}
          appsPerPage={appsPerPage}
          totalApps={this.state.data.length}
        />
        <form
          style={{ width: "30%", position: "fixed", right: "1%", top: "8%" }}
        >
          <h3 style={{ textAlign: "center" }} className="text-primary mb-4">
            Params/Range
          </h3>
          <label className="input-group-text" for="by">
            by:
          </label>
          <select className="form-control" id="by">
            <option>id</option>
            <option>name</option>
          </select>
          <label className="input-group-text" for="start">
            start:{" "}
          </label>
          <input className="form-control" id="start" type="number"></input>
          <label className="input-group-text" for="end">
            end:{" "}
          </label>
          <input className="form-control" id="end" type="number"></input>
          <label className="input-group-text" for="max">
            max:{" "}
          </label>
          <input className="form-control" id="max" type="number"></input>
          <label className="input-group-text" for="order">
            order:{" "}
          </label>
          <select className="form-control" id="order">
            <option>asc</option>
            <option>desc</option>
          </select>
          <input
            onClick={arrange}
            className="input-group-text"
            id="submit"
            type="submit"
            name="submit"
            value="Submit Query"
          ></input>
        </form>
      </div>
    );
  }
}
