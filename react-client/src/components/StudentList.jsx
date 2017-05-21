import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';

const style = {
  width: '50%',
  margin: 'auto'
}

class StudentList extends React.Component {
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

  handleStudentClick(student) {
    this.props.studentOnClick(student);
  }

  render() {
    const studentList = this.state.myStudents.map((student) =>
      <ListItem 
        key={student.id} 
        style={style}
        onClick={() => {this.handleStudentClick(student)}}
        primaryText={`${student.first_name} ${student.last_name}`}/>
    );
    return (
      <div>
        <h3>My Students</h3>
        <List>{studentList}</List>
      </div>
    )
  }

}
export default StudentList;
