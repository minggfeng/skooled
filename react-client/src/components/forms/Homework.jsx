import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';

class Homework extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        myHomework: [],
        currentHomework: 0,
        currentQuestions: []
      }
    this.homeworkOnClick = this.homeworkOnClick.bind(this);
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
        axios.post('/forms/questions', options, config)
        .then(response => {
          this.setState({
            currentQuestions: response.data
          })
        })
      })
    })
    .catch(error => {
      console.error('Failed to upload questions from db', error);
    })
  }

  homeworkOnClick(homework) {
    this.setState({
      currentHomework: homework.id
    })
  }

  render() {
    var myHomework = this.state.myHomework.map((homework, index) => (<ListItem
          id={index}
          key={homework.id}
          onClick={() => {this.homeworkOnClick(homework)}}
          primaryText={`${homework.title}`}>
          </ListItem>)
    );
    return (
      <div>
        <h5>My Homework Forms</h5>
          <List>{myHomework}</List>
      </div>
    )
  }
}

export default Homework;