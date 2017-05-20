import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class StudentAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'student'
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    console.log('Rendering StudentAdmin component');
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    // HTTP transaction to server to send this.state to server.
    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    };
    console.log('sending userInfo', userInfo);
    axios.post('/admin/studentlogin', userInfo, config)
    .then(response => {
      console.log('Successfully added student to db.', response);
    })
    .catch(error => {
      console.error('Failed to add student to db.', error);
    });

    axios.post('/admin/student', userInfo, config)
    .then(response => {
      console.log('Successfully added student to db.', response);
    })
    .catch(error => {
      console.error('Failed to add student to db.', error);
    });
  }


  render() {
    return (
      <div>
        <h2>Enter Student Information</h2>
          <br></br>
          <TextField
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
            id="firsname"
          />
          <br></br>
          <TextField
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
            id="lastname"
          />
          <br></br>
          <TextField
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            id="email"
          />
          <br></br>
          <TextField
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            id="password"
          />
          <br></br>
          <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit} />
      </div>
    )
  }
}

const style = {
  margin: 12,
};

export default StudentAdmin;
