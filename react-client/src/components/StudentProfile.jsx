import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const StudentProfile = (props) => {
  console.log(props);
  return (
    <div>
      <img src={props.currentStudent.photo} width="250px"/>
      <div>Name: {props.currentStudent.first_name} {props.currentStudent.last_name}</div>
      <div>GPA: {props.currentStudent.GPA}</div>
      <div>Attendance: {props.currentStudent.attendance}%</div>
    </div>
  )  
}

export default StudentProfile;