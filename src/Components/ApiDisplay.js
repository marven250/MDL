import React  from "react"
import axios from "axios"
import Posts from "./posts"
export default class ApiDisplay extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    // const [posts, setPosts]= useState([])
    // // const [loading, setLoading]= useState(false)
    // const [currentPage, setCurrentPage]= useState(1)
    // const [postsPerPage, setPostsPerPage]= useState(10)

        componentDidMount(){
            const fetchApps = async ()=>{
            const res = await  axios.get("http://localhost:3000/apps")
            this.setState({data: res.data.data})
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
    //    var showApps = ()=>{
    //        console.log(this.state.data)
    //        for(let i=0; i<this.state.data.length; i++){
    //            console.log(this.state.data[i])
    //        }
    //    }
    //    showApps()

        return(
            <div>
            <Posts apps= {this.state} />
            </div>
        )}
    
}
