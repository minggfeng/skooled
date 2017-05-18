import React from 'react';
import MyChildrenList from './MyChildrenList.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStudents: []
    }
    this.handleStudentClick = this.handleStudentClick.bind(this);
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    axios.get('/home/myStudents', config)
    .then(response => {
      console.log('response received from server', response);
      this.setState({
        myStudents: response.data
      });
    })
    .catch(error => {
      console.log('error, received no response from server', error);
    });
  }

  handleStudentClick(e) {
    this.props.studentOnClick(e);
  }

  render() {
    if (this.props.userType === 'teacher') {
      return (
      	<div>
          <div>
            <h3>Students and Classes</h3>
            <div>
              <Link to="studentList">My Students</Link>
            </div>
            <div>
              <Link to="classList">My Classes</Link>
            </div>
          </div>
          <div>
            <h3>Admin</h3>
            <Link to="documents">Permission Slips</Link>
            <Link to="video">Video</Link>
            <Link to="admin">Create Users</Link>
          </div>
        </div>
      )
    } else {
    const studentList = this.state.myStudents.map((student) =>
      <div key={student.id} id={student.id} onClick={this.handleStudentClick}>
        <img src={student.photo} width="200px"/>
        <div>Name: {student.first_name} {student.last_name}</div>
      </div>
    );
      return (
        <div>
          <div>
            <h3>My Children</h3>
            <div>{studentList}</div>
          </div>
          <div>
            <h3>Activities</h3>
            <Link to="documents">Permission Slips</Link>
            <Link to="video">Video</Link>
          </div>
        </div>
      )
    }
  }
}

export default Home;