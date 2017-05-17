import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const StudentList = (props) => {
  console.log('sdjifhis', props.userType);
  return (
    <div>
      {props.students.map((student) => (<div>{student.first_name}</div>))}
    </div>
  )
}

export default StudentList;