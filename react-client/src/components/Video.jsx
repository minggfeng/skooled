import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
var PUBNUB_PUBLISH_KEY = 'pub-c-49c10967-3fa1-4e45-a8cf-e3f3f66bb3d1';
var PUBNUB_SUBSCRIBE_KEY = 'sub-c-aefb4450-2f44-11e7-9a1a-0619f8945a4f';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Callicon from 'material-ui/svg-icons/communication/call';
import CallEndedicon from 'material-ui/svg-icons/communication/call-end';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      dialeduser: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.configurePhone = this.configurePhone.bind(this);
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('checkOnClientLoad', config)
    .then(response => {
      this.configurePhone(response.data.userid);
      this.setState({userid: response.data.userid});
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
  }

  configurePhone(userid) {
    var video_out = document.getElementById("vid-box");
    var vid_thumb = document.getElementById("vid_thumb");

    var phone = window.phone = PHONE({
        number        : userid,
        publish_key   : PUBNUB_PUBLISH_KEY,
        subscribe_key : PUBNUB_SUBSCRIBE_KEY,
        ssl : (('https:' == document.location.protocol) ? true : false)
    });
    phone.ready(function(){});
    phone.receive(function(session){
      session.connected(function(session){
        video_out.appendChild(session.video);
      });
      session.ended(function(session){
        video_out.innerHTML='';
      });
    });

    function broadcast(vid) {
      var video = document.createElement('video');
      video.src = URL.createObjectURL(phone.mystream);
      video.volume = 0.0;
      video.play();
      video.setAttribute( 'autoplay', 'autoplay' );
      video.setAttribute( 'data-number', phone.number() );
      vid.style.cssText ="-moz-transform: scale(-1, 1); \
              -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
              transform: scale(-1, 1); filter: FlipH;";
      vid.appendChild(video);
    };

    broadcast(vid_thumb);
  }

  handleChange(event) {
    this.setState({dialeduser: event.target.value});
  }

  handleSubmit() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {
        'Authorization': currentToken,
        'username': this.state.dialeduser
      }
    };

    axios.get('/video/userdata', config)
    .then(response => {
      phone.dial(response.data.id);
    })
    .catch(error => {
      console.log('error, received no response from server');
      alert('Please submit a valid email address.');
    });
  }

  endCall() {
    phone.hangup();
  }

  render() {
    return (
      <div>
        <h2> Video Chat </h2>
        <div id="vid-div">
        <TextField
            placeholder="Enter email to dial"
            onChange={this.handleChange}
            id="call-form"
            name="callForm"
          />
          <RaisedButton 
            label = "Call"
            primary = {true}
            style = {style}
            onClick={this.handleSubmit}
            icon={<Callicon />}
           />
          <RaisedButton 
            label = "End Call"
            secondary={true}
            style = {style}
            onClick={this.endCall}
            id="end-call"
            icon={<CallEndedicon />}
           />
        </div>
        <div id="vid-box"></div>
        <div id="vid-thumb"></div>
      </div>
    )
  }
}

const style = {
  margin: 12,
};

export default Video;