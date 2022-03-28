import React, { useRef } from 'react';
import moment from 'moment'
import Moment from 'react-moment';
import {Link} from "react-router-dom";
import styled from "styled-components"
const BugList = (props) => {
  const currentDateTime = moment()
    console.log(props);
    const inputEl = useRef("");
    
    const renderBugList = props.bugs.map((bug) => {
        return (
            <div className="item" key={bug._id}>
                <div className="content">
                    <Link to={{pathname:`bug/${bug._id}`, state: {bug:bug}}}>
                        <div className="header" style={{color:"Black",fontSize:"30px"}}>Title:{bug.title}</div> 
                    </Link>  
                        <div style={{marginLeft:"350px"}}>
                          <span><p>CreatedAt: <Moment format='MMMM Do YYYY, h:mm:ss a'>{currentDateTime}</Moment></p></span>
                        </div>   
                        
                      &nbsp;&nbsp;&nbsp;            
                        <div className="description">Description: {bug.description}</div>
                        <div className="assigneev">Assignee: {bug.assignee}</div>
                    
                </div>
                <DeleteButton onClick={(e) =>props.getBugId(bug._id)}>Delete</DeleteButton>
                <Link to={{pathname:`edit`, state:{bug:bug}}}>
                  <EditButton>Edit</EditButton>
                </Link>
            </div>
        )
    })

    const getSearchTerm = () => {
        console.log(inputEl.current.value);
        props.searchKeyword(inputEl.current.value);
    }
  return (
    <div className="ui celled list" style={{marginTop:"100px"}}>
        <h2>Bug List
            <Link to="/add">
              <AddButton>Add new bug</AddButton>
            </Link>
            
        </h2>
        &nbsp;&nbsp;&nbsp;
        <div className="ui search">
          <div className="ui icon input">
            <input ref={inputEl} type="text" palceholder="Search Bugs" className="prompt" value={props.term} onChange={getSearchTerm}/>
            <i className="search icon"></i>
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;
        {renderBugList.length>0 ? renderBugList: "No Bugs Available"}
    </div>
  )
}

export default BugList
const AddButton= styled.div`
background-color: #0e273c;
  color: white;
  padding: 5px 20px;
  margin: 8px 10px;
  border: none;
  cursor: pointer;
  max-width:22%;
  text-decoration: none;
`
const DeleteButton= styled.div`
background-color: red;
  color: white;
  padding: 5px 20px;
  margin: 18px 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  max-width:10%;
`
const EditButton= styled.div`
background-color: blue;
  color: white;
  padding: 5px 20px;
  margin: 18px 10px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  max-width:10%;
`