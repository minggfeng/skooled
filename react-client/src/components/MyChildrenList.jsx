import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

class MyChildrenList extends React.Component {
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
    axios.get('/home/myStudents', config)
    .then(response => {
      console.log('response received from server', response);
      this.setState({
        myStudents: response.data
      })
    })
    .catch(error => {
      console.log('error, received no response from server', error);
    });
  }

  render() {
    const studentList = this.state.myStudents.map((student) =>
      <div key={student.id}>
        <img src={student.photo} width="100px"/>
        <div>Name: {student.first_name} {student.last_name}</div>
      </div>
    );
    return (
      <div>
        <div>{studentList}</div>
      </div>
    )
  }

}
export default MyChildrenList;
