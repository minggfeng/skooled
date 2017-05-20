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

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homework: [],
      questions: [],
      name: ''
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
      console.log(response)
    })
    .catch(error => {
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
    }, this)
    return (
      <div>
        <h2>Homework Builder</h2>
          <RaisedButton label="Save Homework" onClick={this.saveAll}></RaisedButton>
          <br></br>
        <Paper style={style}>
        <Menu>
          <List>
            <ListItem 
              primaryText="Short Essay" 
              draggable="true" id="shortEssay" 
              onDragStart={(e) => {this.drag(e)}}></ListItem>
            <ListItem 
              primaryText="Multiple Choice" 
              draggable="true" id="multipleChoice" 
              onDragStart={(e) => {this.drag(e)}}></ListItem>
          </List>
        </Menu>
        </Paper>
          <TextField 
            value={this.state.name}
            fullWidth
            hintText="name of homework"
            onChange={this.handleNameChange}/>
          <div id="dropArea" onDragOver={this.preventDefault} onDrop={this.drop}>
            <h3>Drag to Here</h3>
            <div>{questions}</div>
          </div>
        <div>
        </div>
      </div>
    )
  }
}

export default FormBuilder;
