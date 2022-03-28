import React, {useState, useEffect} from 'react';
import Header from "./components/Header";
import AddBug from "./components/AddBug";
import BugList from "./components/BugList";
import BugDetails from "./components/BugDetails";
import EditBug from "./components/EditBug";
import Signup from "./components/Signup";
import Login from "./components/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import api from "./api/bugs";

function App() {
   
    // const LOCAL_STORAGE_KEY = "bugs";
    const [bugs, setBugs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //Retrieve bugs
    const retrieveBugs = async () => {
        const response = await api.get("/api/bug");
        console.log(response);
        return response.data;
    }
    
    //Add bug
    const addBugHandler = async (bug) => {
        console.log(bug);
        const request = {
            ...bug
        }
        const response = await api.post("/api/bug", request)
        console.log(response)
        setBugs([...bugs, response.data])
    }

    //Remove Bug
    const removeBugHandler = async (_id) => {
        await api.delete(`/api/bug/${_id}`)
        const newBugList = bugs.filter((bug) => {
            return bug._id !== _id
        });
        setBugs(newBugList)
    }

    //update bug
    const updateBugHandler = async (bug) => {
        const response = await api.put(`/api/bug/${bug._id}`, bug)
        console.log(response.data)
        const { _id, title, description, assignee } = response.data;
        setBugs(
            bugs.map((bug) => {
          return bug._id === _id ? {...response.data} : bug;
        })
        );
    }
    
    //Search bugs
     const searchHandler =(searchTerm) => {
         console.log(searchTerm);
         setSearchTerm(searchTerm);
         if(searchTerm!=="") {
             const newBugList = bugs.filter((bug) => {
                 console.log(Object.values(bug).join(" ")
                 .toLocaleLowerCase()
                 .includes(searchTerm.toLocaleLowerCase()))
                 return Object.values(bug).join(" ")
                 .toLocaleLowerCase()
                 .includes(searchTerm.toLocaleLowerCase())
             });
             setSearchResults(newBugList);
         } else {
             setSearchResults(bugs);
         }
     }
    useEffect(() => {
        const getAllBugs = async () => {
            const allBugs = await retrieveBugs();
            if(allBugs) setBugs(allBugs)
        };
        getAllBugs();
    },[])

  return (
    <div className="ui container" style={{width:"50%"}}>
        <Router>
            <Header />
            <Switch>                              
               
                <Route path="/add" render={(props) => (<AddBug {...props} addBugHandler={addBugHandler}/>)}/>
                <Route path="/edit" render={(props) => (<EditBug {...props} updateBugHandler={updateBugHandler}/>)}/>
                <Route path="/bug/:id" component={BugDetails}/> 
                <Route path="/signup" component={Signup}/>      
                <Route path="/dashboard" render={(props) => (<BugList {...props} bugs={ searchTerm.length < 1 ? bugs : searchResults} getBugId={removeBugHandler} term={searchTerm} searchKeyword={searchHandler}/>)}/>              
                <Route path="/" component={Login} />
                
            </Switch>
        </Router>
        
    </div>
  );
}

export default App