import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      console.log(props);
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Hello!
      </div>
    )
  }

}
export default StudentList;