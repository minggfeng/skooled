import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import CreateUser from './CreateUser.jsx';
import Nav from './Nav.jsx';
import axios from 'axios';
import DocumentsList from './DocumentsList.jsx';
import CreateDocument from './CreateDocument.jsx';
import Video from './Video.jsx';
import Logout from './Logout.jsx';
import Home from './Home.jsx';
import ClassList from './ClassList.jsx';
import StudentList from './StudentList.jsx';
import StudentProfile from './StudentProfile.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="/login"/>);
    } else {
      return (
        <div>
          <Nav userType={this.props.userType}/>
          <div className="main container-fluid col-md-12">
            <Route name="home" exact path="/" component={() => (<Home userType={this.props.userType} firstName={this.props.firstName}/> )} />
            <Route name="nav" path="/nav" component={Nav} />
            <Route name="admin" path="/admin" component={() => (<CreateUser /> )} />
            <Route name="documents" path="/documents" component={() => (<DocumentsList userType={this.props.userType} /> )} />
            <Route name="createDocument" path="/createDocument" component={() => (<CreateDocument userType={this.props.userType} reRender={this.reRender}/>)} />
            <Route name="video" path="/video" component={() => (<Video /> )} />
            <Route name="classList" path="/classList" component={() => (<ClassList /> )} />
            <Route name="studentList" path="/studentList" component={() => (<StudentList /> )} />
            <Route name="logout" path="/logout" component={() => (<Logout revokeCredentials={this.props.revokeCredentials}/> )} />
          </div>
        </div>
      )
    }
  }
}

export default App;