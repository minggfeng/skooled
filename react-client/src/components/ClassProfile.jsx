import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';


const styles = {
  card: {
    width: '50%',
    margin: 'auto'
  }
}

class ClassProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      assignments: [ {id: 0, title: 'No Assignments'} ]
    }
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}    
    };
    let options = {
      classId: this.props.currentClass.id
    }
    axios.post('/classes/students', options, config)
    .then(response => {
      console.log('Success getting students list from db.', response.data);
      this.setState ({
        students: response.data
      });
    })
    .catch(error => {
      console.error('Error getting students list from db.', error);
    });

    axios.post('/classes/assignments', options, config)
    .then(response => {
      console.log('Success getting assignments list from db.', response.data);
      this.setState ({
        assignments: response.data
      });
    })
    .catch(error => {
      console.error('Error getting assignments list from db.', error);
    });
  }

  render() {
    const assignments = this.state.assignments.map((assignment) =>
      <ListItem
        key={assignment.id}
        primaryText={assignment.title} />
    )

    const students = this.state.students.map((student) =>
      <ListItem
        key={student.id}
        primaryText={`${student.first_name} ${student.last_name}`} />
    )


    return (
      <Card style={styles.card}>
        <CardTitle title={this.props.currentClass.name} />
        <CardText>
          <h4>Assignments</h4>
          <List>{assignments}</List>
          <h4>Students</h4>
          <List>{students}</List>
        </CardText>
      </Card>
    )
  }
}


export default ClassProfile;
