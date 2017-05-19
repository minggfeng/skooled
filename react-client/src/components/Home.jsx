import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

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

  handleStudentClick(student) {
    this.props.studentOnClick(student);
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
            <div>
              <Link to='grades'>Grades</Link>
            </div>
            <div>
              <Link to="documents">Permission Slips</Link>
            </div>
            <div>
              <Link to="video">Video</Link>
            </div>
            <div>
              <Link to="admin">Create Users</Link>
            </div>
            <div>
              <Link to="message">Send a message</Link>
            </div>
            <div>
              <Link to="formBuilder">Create Homework</Link>
            </div>
          </div>
        </div>
      )
    } else {
    const studentList = this.state.myStudents.map((student) =>
      <GridTile 
        title={`${student.first_name} ${student.last_name}`} 
        titleStyle={styles.titleStyle} 
        key={student.id} onClick={() => {this.handleStudentClick(student)}}
        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        subtitle={`GPA: ${student.gpa}`}>
        <img src={student.photo}/>
      </GridTile>
    );
      return (
        <div>
          <div>
            <h3>My Children</h3>
            <div style={styles.root}>
              <GridList style={styles.gridList} cols={2.2}>{studentList}</GridList>
            </div>
          </div>
          <div>
            <h3>Activities</h3>
            <GridList>
             <Link to="documents">  
              <RaisedButton
                  label="Permission Slips"></RaisedButton>
            </Link>
            <Link to="video">
              <RaisedButton label="Video"></RaisedButton>
            </Link>
            </GridList>
          </div>
        </div>
      )
    }
  }
}

export default Home;
