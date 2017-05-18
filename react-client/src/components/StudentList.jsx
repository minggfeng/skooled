import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myStudents: []
    }
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}    
    };
    // Make http request to obtain array of students to populate the dropdown for student.
    axios.get('/home/myStudents', config)
    .then(response => {
      console.log('Success getting students list from db.', response.data);
      this.setState ({
        myStudents: response.data
      });
    })
    .catch(error => {
      console.error('Error getting classes list from db.', error);
    });
  }

  render() {
    const studentList = this.state.myStudents.map((student) =>
      <div key={student.id}>
        <div>Name: {student.first_name} {student.last_name}</div>
      </div>
    );
    return (
      <div>
        <h3>My Students</h3>
        <div>{studentList}</div>
      </div>
    )
  }

}
export default StudentList;