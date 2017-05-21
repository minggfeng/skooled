import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MultipleChoice from './forms/MultipleChoice.jsx';
import EssayForm from './forms/EssayForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import $ from 'jquery'
import {GridList, GridTile} from 'material-ui/GridList';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Homework from './forms/Homework.jsx';

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

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
  },
  text: {
    width: '80%'
  }
};

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homework: [],
      questions: [],
      name: '',
      myHomework: [],
      currentHomework: {}
    }
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.appendQuestion = this.appendQuestion.bind(this);
    this.saveAll = this.saveAll.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  preventDefault(e) {
    e.preventDefault()
  }

  appendQuestion(type) {
    this.setState({
      homework: this.state.homework.concat([type])
    })
  }

  drag(e) {
    e.dataTransfer.setData('text', e.target.id);
  }

  drop(e) {
    e.preventDefault();
    let type = e.dataTransfer.getData('text');
    this.appendQuestion(type);
  }

  saveAll() {
    let currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    let formInfo = {
      name: this.state.name,
      questions: this.state.questions
    }
    axios.post('/forms/save', formInfo, config)
    .then(response => {
      this.props.history.push('/homework');
    })
    .catch(error => {
      alert('Try again, failed to save!');
      console.error('Failed to add form to db', error);
    })
  }

  saveQuestion(id, content) {
    var questions = this.state.questions;
    questions[id] = content;
    this.setState({ questions: questions });
  }

  handleNameChange (e) {
    this.setState({
      name: e.target.value
    })
  }

  render () {
    var questions = this.state.homework.map((type, i) => {
      var props = {
        id: i,
        onChange: this.saveQuestion,
        key: i
      }
      if (type === "shortEssay") {
        var question = <EssayForm {...props}/>
      } else {
        var question = <MultipleChoice {...props}/>
      }
      return  question;
    }, this);
    return (
      <div>
        <h2 className="header">Form Builder</h2>
        <TextField 
            value={this.state.name}
            hintText="Name of Form"
            onChange={this.handleNameChange}
            style={styles.text}/>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={10} padding={10} rows={2}>
            <GridTile style={styles.questions} 
              cols={8} 
              rows={2} 
              title="Drop Area" 
              titlePosition="top" 
              titleStyle={styles.title} 
              titleBackground="#00BCD4" id="dropArea" onDragOver={this.preventDefault} onDrop={this.drop}>
              <br></br>
              <List>{questions}</List>
            </GridTile>
            <GridTile style={styles.toolbar} cols={2} rows={2} title="Fields" titlePosition="top" titleStyle={styles.title} titleBackground="#00BCD4">
              <br></br>
              <List>
                <ListItem 
                  primaryText="Short Essay" 
                  draggable="true" 
                  id="shortEssay" 
                  onDragStart={(e) => {this.drag(e)}}></ListItem>
                <ListItem 
                  primaryText="Multiple Choice" 
                  draggable="true" 
                  id="multipleChoice" 
                  onDragStart={(e) => {this.drag(e)}}></ListItem>
              </List>
            </GridTile>
            <GridTile
              cols={8} 
              rows={2}>
              <RaisedButton label="Save Form" onClick={this.saveAll}></RaisedButton>
            </GridTile>
          </GridList>
        </div>
      </div>
    )
  }
}

export default FormBuilder;
