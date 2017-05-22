import React from 'react';
import $ from 'jquery';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Phone, { isValidPhoneNumber } from 'react-phone-number-input'

class Message extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      message: '',
      characterCount: 160,
      sent: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.prefill = this.prefill.bind(this);
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
    if (!/[+]1[0-9]{3}[0-9]{3}[0-9]{4}/.test(phoneNumber) || !isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid US phone number');
    } else if (!message || message.length > 160) {
      alert('Please enter a message up to 160 characters');
    } else {
      phoneNumber = phoneNumber.match(/[0-9]+/g).join(''); 
      $.post('/message', { phoneNumber, message });
      this.setState({ sent: true });
      setTimeout(() => {
        this.setState({ sent: false,
                        message: '',
                        phoneNumber: '',
                        characterCount: 160 });
        $('#message-text').val('');
        $('#message-text').attr('placeholder', 'Message text');
        $('#phone-number').val('');
      }, 3000);
    }
  }

  prefill(event, index, value) {
    this.setState({ phoneNumber: value});
    $('#phone-number').val(value);
  }

  render() {
    let charCountDiv;
    if (this.state.characterCount >= 0 && this.state.characterCount < 160) {
      charCountDiv = <div>{this.state.characterCount || 160} characters left</div>;
    } else if (this.state.characterCount === 160) {
      charCountDiv = <div />;
    } else {
      charCountDiv = <div style={charCountStyle}>{this.state.characterCount} characters left</div>;
    }
    return (
      <div className="main container-fluid">
        <div id="message-form">
          <div id="message-title">
            <h2>Send Text Messages to Parents</h2>
          </div>
          <DropDownMenu onChange={this.prefill} value="Please select" style={{'top': '-80px'}}>
            <MenuItem value={'Please select'} primaryText="Please select" />
            <MenuItem value={'+15551234567'} primaryText="Sick kid's parent" />
          </DropDownMenu>
          <Phone
            country="US"
            placeholder="Enter valid phone number"
            value={ this.state.phoneNumber }
            onChange={ phoneNumber => this.setState({ phoneNumber }) } 
            id="phone-number"/>
          <br />
          <TextField hintText="Message text" 
                     onChange={this.handleMessageChange}
                     multiLine={true}
                     id="message-text" />
          {charCountDiv}
          <br />
          <RaisedButton label="Submit" 
                        primary={true} style={style} 
                        onClick={this.handleSubmit} />
          <br />
          {
            this.state.sent 
              ? <div><h4><em>Message sent!</em></h4></div>
              : null
          }
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