import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import MultipleChoiceReleased from './MultipleChoiceReleased.jsx';
import EssayFormReleased from './EssayFormReleased.jsx';
import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '80%'
  },
  questions: {
    overflowY: 'auto',
    overflowX: 'auto',
    border: '1px solid #E0E0E0'
  },
  toolbar: {
    overflowY: 'auto',
    overflowX: 'auto',
    border: '1px solid #E0E0E0'
  },
  title: {
    color: 'FFF',
    margin: '5px'
  }
};


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
        <h2 className="header">My Forms</h2>
        <div style={styles.root}>
        <GridList style={styles.gridList} cols={10} padding={10} rows={2}>
          <GridTile style={styles.questions} cols={8} rows={2} title="Current Form" titlePosition="top" titleStyle={styles.title} titleBackground="#00BCD4">
            <br></br>
            <List>{questions}</List>
          </GridTile>
          <GridTile style={styles.toolbar} cols={2} rows={2} title="My Saved Forms" titlePosition="top" titleStyle={styles.title} titleBackground="#00BCD4">
            <br></br>
            <List>{myHomework}</List>
          </GridTile>
        </GridList>
        </div>
      </div>
    )
  }
}

export default Homework;