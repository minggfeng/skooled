import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ParentAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
	    phone: '',
      password: '',
      students: [],
      studentId: null,
      role: 'parent'
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleStudentSelect = this.handleStudentSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    console.log(this.props);
    // Make http request to obtain array of students to populate the dropdown for student.
    axios.get('/admin/students', config)
    .then(response => {
      // console.log('Success getting students list from db.', response.data);
      this.setState ({
        students: response.data
      });
    })
    .catch(error => {
      console.error('Error getting students list from db.', error);
    });
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

  handlePhoneChange(event) {
    this.setState({phone: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleStudentSelect(event, index, value) {
    this.setState({studentId: value});
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
      phone: this.state.phone,
      password: this.state.password,
      studentId: this.state.studentId,
      role: this.state.role
    };
    console.log('sending userInfo', userInfo);
    axios.post('/admin/parent', userInfo, config)
    .then(response => {
      console.log('Successfully added parent to db.', response);
    })
    .catch(error => {
      console.error('Failed to add parent to db.', error);
    });
  }


	render() {
    // console.log('this.state.students', this.state.students);
    // console.log('Current studentId', this.state.studentId);
  	return (
			<MuiThemeProvider>
        <div>
          <h2>Enter Parent Information</h2>
            <br></br>
            <TextField
              className="parentFirstNameInput"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
              id="firstname"
            />
            <br></br>
            <TextField
              className="parentLastNameInput"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
              id="lastname"
            />
            <br></br>
            <TextField
              className="parentEmailInput"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              id="email"
            />
            <br></br>
            <TextField
              className="parentPhoneNumberInput"
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
              id="number"
            />
            <br></br>
            <TextField
              className="parentPasswordInput"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              id="password"
            />
            <br></br>
            <DropDownMenu onChange={this.handleStudentSelect} value="Please choose" >
              <MenuItem value={'Please choose'} primaryText="Please choose" />
              {this.state.students.map((student, index) =>
                <MenuItem value={student.id} key={student.id} primaryText={student.first_name + ' ' + student.last_name} />
              )}
            </DropDownMenu>
            <br></br>
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit} />
        </div>
			</MuiThemeProvider>
		)
	}
}

const styles = {
  customWidth: {
    width: 200,
  },
};

const style = {
  margin: 12,
};

export default ParentAdmin;