import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
  width: '50%',
  margin: 'auto'
}

class ClassProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      assignments: []
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
    console.log('!!!', this.props)
    return (
      <Card style={style}>
        <CardTitle title={this.props.currentClass.name} />
        <CardText>
          <div>Hello</div>
        </CardText>
      </Card>
    )
  }
}


export default ClassProfile;
