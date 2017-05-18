import React from 'react';
import { withRouter } from 'react-router-dom';
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

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false}); 
    }, 500);
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
        null
      );
    } else {
      return (
        <div className="main container-fluid col-md-12" id="loginpage">
          <div id="loginform">
          <div id="logintitle">
            <h2 > Welcome to Skooled! </h2>
            <h3 > Log in: </h3>
          </div>
            <TextField
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              id="username"
            />
            <br></br>
            <TextField
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="password"
              id="password"
            />
            <br></br>
            <RaisedButton label="Submit" primary={true} style={style} onClick={this.handleSubmit} />
          </div>
        </div>
      );
    }
  }
}

const style = {
  margin: 12,
};

export default withRouter(Login);