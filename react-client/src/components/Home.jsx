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
      	<div id="teacher-dashboard">
          <h1>Teacher Dashboard</h1>
          <br />
          <div>
            <h3>Students and Classes</h3>

            <Link to="studentList">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/diverse_graduates.jpg" width="200" height="150" />
              </button>
            </Link>

            <Link to="classList">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/subjects1.jpg" width="200" height="150" />
              </button>
            </Link>

            <Link to="homework">
                <button className="btn btn-default">
                  <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/homework.jpg" width="200" height="150" />
                </button>
              </Link>

            <Link to="formBuilder">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/forms.jpg" width="200" height="150" />
              </button>
            </Link>
          </div><br />
          <div>
            <h3>Administration</h3>

            <Link to="grades">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/gradebook.jpg" width="200" height="150" />
              </button>
            </Link>


            <Link to="documents">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/permission-slip.gif" width="200" height="150" />
              </button>
            </Link>

            <Link to="video">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/video.jpg" width="200" height="150" />
              </button>
            </Link>

            <Link to="message">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/lower-sms-prices.jpg" width="200" height="150" />
              </button>
            </Link>

            <Link to="admin">
              <button className="btn btn-default">
                <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/administrator.jpeg" width="200" height="150" />
              </button>
            </Link>

          </div>
        </div>
      )
    } else if (this.props.userType === 'student') {
      return (
        <div>Hello Student
        </div>
        );

    }else {
    const studentList = this.state.myStudents.map((student) =>
      <GridTile
        title={`${student.first_name} ${student.last_name}`}
        titleStyle={styles.titleStyle}
        key={student.id}
        onClick={() => {this.handleStudentClick(student)}}
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
