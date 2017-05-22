import React from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
	constructor (props) {
		super (props);
    this.state = {
      username: '',
      password: '',
      loading: true
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    if (this.props.isLoggedIn) {
      setTimeout(() => {
        this.props.history.push('/');      
        this.setState({loading: false}); 
      }, 1000);
    } else {
      setTimeout(() => {
        this.setState({loading: false}); 
      }, 1000);
    }
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    this.props.enterCredentials(this.state.username, this.state.password);
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading">
          <CircularProgress size={120} thickness={8} style={{'margin-left': '50%', 'left': '-65px', 'margin-top': '100px'}} />
        </div>
      );
    } else {
      return (
        <div className="main container-fluid col-md-12" id="loginpage">
          <div id="loginform">
            <div>
              <img src="https://s3-us-west-1.amazonaws.com/skooledds-bucket/skooled_logo2.png" id="logintitle" />
            </div>
            <h3 > Log in: </h3>
            <TextField
              placeholder=" Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              id="username"
              style={textFieldStyle}
            />
            <br></br>
            <TextField
              placeholder=" Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="password"
              id="password"
              style={textFieldStyle}
            />
            <br></br>
            <RaisedButton label="Submit" primary={true} style={buttonStyle} onClick={this.handleSubmit} />
          </div>
        </div>
      );
    }
  }
}

const buttonStyle = {
  margin: 12
};

const textFieldStyle = {
  'background-color': 'white'
};

export default withRouter(Login);