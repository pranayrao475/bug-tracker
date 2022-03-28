import React from 'react'

class EditBug extends React.Component {
    constructor(props) {
        super(props);
        const {_id, title, description, assignee} = props.location.state.bug;
    this.state = {
        _id,
        title,
        description,
        assignee,
    }
}

    update = (e) => {
        e.preventDefault();
        if(this.state.title === "" || this.state.description === "" || this.state.assignee === "") {
            alert("All the fields are mandatory");
            return;
        }
        this.props.updateBugHandler(this.state);
        this.setState({title:"", description:"", assignee:""})
        console.log(this.state);
        console.log(this.props);
        this.props.history.push("/dashboard");
    }
    render() {
        return (
            <div className="ui main">
                <h2>Edit Bug</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Title" value= {this.state.title} onChange={(e) => this.setState({title:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <input type="text" name="description" placeholder="Description" value= {this.state.description} onChange={(e) => this.setState({description:e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Assignee</label>
                        <input type="text" name="assignee" placeholder="Assignee" value= {this.state.assignee} onChange={(e) => this.setState({assignee:e.target.value})}/>
                    </div>
                    <div style={{paddingLeft:"275px"}}>
                      <button className="ui button blue">Update Bug</button>
                    </div>
                </form>
            </div>
        );
    }
  
}

export default EditBug