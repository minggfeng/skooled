import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';

const style = {
  width: '50%',
  margin: 'auto'
}


class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    }
    this.handleClassCLick = this.handleClassCLick.bind(this);
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

  handleClassCLick(classData) {
    this.props.classOnClick(classData);
  }

  render() {
    const classesList = this.state.classes.map((classData) =>
      <ListItem 
        key={classData.id}
        style={style}
        onClick={() => {this.handleClassCLick(classData)}}
        primaryText={`${classData.name}`}/>
    );
    return (
      <div>
          <h3>My Classes</h3>
          <List>{classesList}</List>
      </div>
    )
  }
}

export default ClassList;