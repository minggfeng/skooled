import React from 'react';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Message extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      message: '',
      characterCount: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handlePhoneNumberChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleMessageChange(event) {
    var characterCount = 160 - event.target.value.length;
    this.setState({ message: event.target.value,
                    characterCount
                  });
  }

  handleSubmit() {
    var phoneNumber = this.state.phoneNumber;
    var message = this.state.message;
    if (!/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNumber)) {
      alert('Please enter number with the format 234-555-1234');
    } else if (!message || message.length > 160) {
      alert('Please enter a message up to 160 characters');
    } else {
      phoneNumber = phoneNumber.match(/[0-9]+/g).join(''); 
      $.post('/message', { phoneNumber, message });
    }
    
  }

  render() {
    let charCountDiv;
    if(this.state.characterCount >= 0) {
      charCountDiv = <div>{this.state.characterCount} characters left</div>;
    } else {
      charCountDiv = <div style={charCountStyle}>{this.state.characterCount} characters left</div>;
    }
    return (
      <div className="main container-fluid col-md-12">
        <div id="message-form">
          <div id="message-title">
            <h2>Send Text Messages to Parents</h2>
          </div>
          <TextField hintText="Phone Number ex.(234-555-1234)" 
                     onChange={this.handlePhoneNumberChange}
                     id="phone-number" />
          <br />
          <TextField hintText="Message text" 
                     onChange={this.handleMessageChange}
                     multiLine={true}
                     rows={2}
                     rowsMax={4}
                     id="password" />
          {charCountDiv}
          <br />
          <RaisedButton label="Submit" 
                        primary={true} style={style} 
                        onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const style = {
  margin: 12,
};

const charCountStyle = {
  color: 'red'
};

export default Message;