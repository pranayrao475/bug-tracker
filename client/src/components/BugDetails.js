import React from 'react';
//import Moment from 'moment';
import {Link} from "react-router-dom";

const BugDetails = (props) => {
    console.log(props)
    const { title, description, assignee } = props.location.state.bug;
   
        return (
          <div className="main" style={{marginTop:"50px"}}>
              <div className="ui card left">
                  <div className="content">
                      <div className="header">Title: {title}</div>
                      <div className="description">Description: {description}</div>
                      <div className="assignee">Assignee: {assignee}</div>
                  </div>
              </div>
              <div className="center-div" style={{marginLeft:"20px"}}>
                  <Link to="/dashboard">
                    <button className=" ui button blue center">Back to Bugs List</button>
                  </Link>
                  
              </div>
          </div>
        )
    
}

export default BugDetails;