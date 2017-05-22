import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

  },
  gridlist: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'FFF',
    titleBackground: '#00BCD4'
  },
  list: {
    width: '85%',
    margin: 'auto',
    col: '1'
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
        <List style={styles.list}>
          <ListItem hoverColor="FFF"><h3>Students and Classes</h3></ListItem>
          <ListItem hoverColor="FFF">
          <div style={styles.root}>
            <GridList style={styles.gridlist}>

              <Link to="studentList">  
                <GridTile title="Student List" titleBackground="#00BCD4">
                  <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/diverse_graduates.jpg" width="200" height="150" />
                </GridTile>
              </Link>

              <Link to="classList">  
                <GridTile title="Class List" titleBackground="#00BCD4">
                  <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/subjects1.jpg" width="200" height="150" />
                </GridTile>
              </Link>

              <Link to="homework">  
                <GridTile title="My Forms" titleBackground="#00BCD4">
                  <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/forms.jpg" width="200" height="150" />
                </GridTile>
              </Link>

              <Link to="formBuilder">  
                <GridTile title="Form Builder" titleBackground="#00BCD4">
                  <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/homework.jpg" width="200" height="150" />
                </GridTile>
              </Link>

            </GridList>
          </div>
          </ListItem>
          <ListItem hoverColor="FFF"><h3>Administration</h3></ListItem>
          <ListItem hoverColor="FFF">
            <div style={styles.root}>
              <GridList style={styles.gridlist}>
 
                <Link to="grades">  
                  <GridTile title="Grades" titleBackground="#00BCD4">
                    <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/gradebook.jpg" width="200" height="150" />
                  </GridTile>
                </Link>

                <Link to="documents">  
                  <GridTile title="Permission Slips" titleBackground="#00BCD4">
                    <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/permission-slip.gif" width="200" height="150" />
                  </GridTile>
                </Link>
        
                <Link to="video">  
                  <GridTile title="Video" titleBackground="#00BCD4">
                    <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/video.jpg" width="200" height="150" />
                  </GridTile>
                </Link>
                
                <Link to="message">  
                  <GridTile title="Message" titleBackground="#00BCD4">
                    <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/lower-sms-prices.jpg" width="200" height="150" />
                  </GridTile>
                </Link>

                <Link to="admin">  
                  <GridTile title="Create User" titleBackground="#00BCD4">
                    <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/administrator.jpeg" width="200" height="150" />
                  </GridTile>
                </Link>

            </GridList>
          </div>
        </ListItem>
        </List>
      </div>
      )
    } else if (this.props.userType === 'student') {
      return (
        <div>
          <List style={styles.list}>
            <ListItem hoverColor="FFF"><h3>Activities</h3></ListItem>
            <ListItem hoverColor="FFF">
              <div style={styles.root}>
                <GridList style={styles.gridlist} padding={10}>
                  <Link to="assignments">
                    <GridTile
                      title="Homework"
                      titleBackground="#00BCD4">
                      <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/homework.jpg" width="200" height="150" />
                    </GridTile>
                  </Link>

                  <Link to="video">
                    <GridTile
                      title="Video"
                      titleBackground="#00BCD4">
                      <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/video.jpg" width="200" height="150" />
                    </GridTile>
                  </Link>
                </GridList>
              </div>
            </ListItem>
          </List>
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
          <List style={styles.list}>
            <ListItem hoverColor="FFF"><h3>My Children</h3></ListItem>
            <ListItem hoverColor="FFF">
              {this.state.myStudents.length > 1 &&
              <div style={styles.root}>
                <GridList 
                  style={styles.gridlist} 
                  padding={10}>
                  {studentList}
                </GridList>
              </div>
            }
            {this.state.myStudents.length === 1 &&
              <div style={styles.root}>
                <GridList cols={1} style={styles.gridlist}>
                {studentList}
                </GridList>
              </div>
            }

            </ListItem>
            <ListItem hoverColor="FFF"><h3>Activities</h3></ListItem>
            <ListItem hoverColor="FFF">
              <div style={styles.root}>
                <GridList style={styles.gridlist} padding={10}>
                  <Link to="documents">  
                    <GridTile
                      title="Permission Slips"
                      titleBackground="#00BCD4">
                      <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/permission-slip.gif" width="200" height="150" />
                    </GridTile>
                  </Link>
                  <Link to="video">
                    <GridTile
                      title="Video"
                      titleBackground="#00BCD4">
                      <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/video.jpg" width="200" height="150" />
                    </GridTile>
                  </Link>
                  <Link to="donate">
                    <GridTile
                      title="Donate"
                      titleBackground="#00BCD4">
                      <img src='http://www.nacasports.net/uploads/5/4/6/9/54696951/5508878_orig.png' width="200" height="150" />
                    </GridTile>
                  </Link>

                </GridList>
              </div>
            </ListItem>
          </List>
        </div>
      )
    }
  }
}

export default Home;
