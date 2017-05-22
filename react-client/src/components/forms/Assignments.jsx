import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import MultipleChoiceReleased from './MultipleChoiceReleased.jsx';
import EssayFormReleased from './EssayFormReleased.jsx';
import {GridList, GridTile} from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SelectClassField from './SelectClassField.jsx';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '90%'
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
  },
  button: {
    marginTop: '10'
  }
};

class Assignments extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        myHomework: [],
        currentHomework: null,
        currentQuestions: [],
        classes: []
      }
    this.homeworkOnClick = this.homeworkOnClick.bind(this);
    this.handleSelected = this.handleSelected.bind(this)
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  componentDidMount() {
    const currentToken = window.localStorage.accessToken;
    const config = {
      headers: {'Authorization': currentToken}
    };
    axios.get('/forms/studentClasses', config)
    .then(response => {
      console.log('Success getting classes list from db.', response.data);
      this.setState ({
        classes: response.data
      }, () => {
        this.forceUpdate();
      });
    })
    .catch(error => {
      console.error('Error getting classes list from db.', error);
    });
  }

  homeworkOnClick(homework, index) {
    this.setState({
      currentHomework: index
    }, () => {
      let options = {
        questions: homework.questions
      }
      const currentToken = window.localStorage.accessToken;
      const config = {
        headers: {'Authorization': currentToken}
      };
      axios.post('/forms/questions', options, config)
      .then(response => {
        this.setState({
          currentQuestions: response.data
        })
      })
    })
  }



  handleSubmission() {
    console.log('clicked');
  }

  handleSelected(classId) {
    let options = {
      classes_id: classId
    }
    const currentToken = window.localStorage.accessToken;
    const config = {
      headers: {'Authorization': currentToken}
    };
    axios.post('/forms/studentAssignments', options, config)
    .then(response => {
      this.setState({
        myHomework: response.data,
        currentHomework: 0
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
    .catch(errpr => {
      console.error('Failed to upload assignments');
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

    var currentHomeworkName = this.state.myHomework.length > 0 ? this.state.myHomework[this.state.currentHomework].title : "Select an Assignment";

    var questions = this.state.currentQuestions.map((question, i) => {
      var props = {
        id: i,
        question: JSON.parse(question.content),
        key: question.id
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
        <h2 className="header">My Homework</h2>
        <GridList cols={10} cellHeight={'auto'}>
          <GridTile cols={8}>
            <SelectClassField handleSelected={this.handleSelected} classes={this.state.classes}/>
          </GridTile>
        </GridList>
        <div style={styles.root}>
        <GridList style={styles.gridList} cols={10} padding={10} rows={2}>
          <GridTile style={styles.questions} cols={8} rows={2} title={currentHomeworkName} titlePosition="top" titleStyle={styles.title} titleBackground="#00BCD4">
            <br></br>
            <List>{questions}</List>
          </GridTile>
          <GridTile style={styles.toolbar} cols={2} rows={2} title="My Assignments" titlePosition="top" titleStyle={styles.title} titleBackground="#00BCD4">
            <br></br>
            <List>{myHomework}</List>
          </GridTile>
          <GridTile cols={8}>
            <RaisedButton 
              label="Submit Assignment"
              style={styles.button}
              onClick={this.handleSubmission}>
            </RaisedButton>
          </GridTile>
        </GridList>
        </div>
      </div>
    )
  }
}

export default Assignments;