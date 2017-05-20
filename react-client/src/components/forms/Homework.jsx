import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Homework extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        myHomework: [],
        currentHomework: 0,
        currentQuestions: []
      }
  }

  componentDidMount() {
    let currentToken = window.localStorage.accessToken;
    let config = {
      headers: {'Authorization': currentToken}
    };
    axios.get('/forms/myHomework', config)
    .then(response => {
      this.setState({
        myHomework: response.data,
        currentHomework: response.data.length - 1
      }, () => {
        let options = {
          questions: this.state.myHomework[this.state.currentHomework].questions
        }
        console.log('options', options)
        axios.post('/forms/questions', options, config)
        .then(response => {
          console.log(response);
        })
      })
    })
    .catch(error => {
      console.error('Failed to upload questions from db', error);
    })
  }

  render() {
    return (
      <div>
        <h1>HELO</h1>
      </div>
    )
  }
}

export default Homework;