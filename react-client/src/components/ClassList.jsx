import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    }
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}    
    };
    // Make http request to obtain array of students to populate the dropdown for student.
    axios.get('/home/classes', config)
    .then(response => {
      console.log('Success getting students list from db.', response.data);
      this.setState ({
        classes: response.data
      });
    })
    .catch(error => {
      console.error('Error getting classes list from db.', error);
    });
  }

  render() {
    const classesList = this.state.classes.map((classData) =>
      <div key={classData.id}>{classData.name}</div>
    );
    return (
      <div>
          <h3>My Classes</h3>
          <div>{classesList}</div>
      </div>
    )
  }
}

export default ClassList;