import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
          <h3>My Classes</h3>
      </div>
    )
  }
}

export default ClassList;