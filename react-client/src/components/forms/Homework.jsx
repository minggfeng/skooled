import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import MultipleChoiceReleased from './MultipleChoiceReleased.jsx';
import EssayFormReleased from './EssayFormReleased.jsx';

class Homework extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        myHomework: [],
        currentHomework: null,
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

  homeworkOnClick(homework, index) {
    this.setState({
      currentHomework: index
    }, () => {
      let currentToken = window.localStorage.accessToken;
      let config = {
        headers: {'Authorization': currentToken}
      };
      axios.get('/forms/myHomework', config)
      .then(response => {
        this.setState({
          myHomework: response.data,
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
    })
  }

  render() {
    var myHomework = this.state.myHomework.map((homework, index) => (<ListItem
          id={index}
          key={homework.id}
          onClick={() => {this.homeworkOnClick(homework, index)}}
          primaryText={`${homework.title}`}>
          </ListItem>)
    );

    var questions = this.state.currentQuestions.map((question, i) => {
      var props = {
        id: i,
        question: JSON.parse(question.content),
        key: i
      }
      if (question.type === "shortEssay") {
        var question = <EssayFormReleased {...props}/>
      } else {
        var question = <MultipleChoiceReleased {...props}/>
      }
      return question;
    }, this);
    return (
      <div>
        <h5>My Homework Forms</h5>
          <List>{myHomework}</List>

        <h5>Current Homework</h5>
          <List>{questions}</List>
      </div>
    )
  }
}

export default Homework;