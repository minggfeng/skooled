import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
  width: '50%',
  margin: 'auto'
}

const StudentProfile = (props) => {
  return (
    <Card
      style={style}>
      <CardMedia>
        <img src={props.currentStudent.photo} />
      </CardMedia>
      <CardTitle title={`${props.currentStudent.first_name} ${props.currentStudent.last_name}`} />
      <CardText>
        {`GPA: ${props.currentStudent.gpa}
        Attendance: ${props.currentStudent.attendance}%`}
      </CardText>
    </Card>
  )  
}

export default StudentProfile;