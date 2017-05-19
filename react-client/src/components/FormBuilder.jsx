import React from 'react';
import ReactDOM from 'react-dom';
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

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homework: []
    }
    this.components = {
      shortEssay: <EssayForm />,
      multipleChoice: <MultipleChoice />
    }
    this.drag = this.drag.bind(this);
    this.drop = this.drop.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
    this.appendQuestion = this.appendQuestion.bind(this);
  }

  preventDefault(e) {
    e.preventDefault()
  }

  appendQuestion(type) {
    let componentToAdd = this.components[type];
    this.setState({
      homework: this.state.homework.concat([componentToAdd])
    })
  }

  drag(e) {
    e.dataTransfer.setData('text', e.target.id);
  }

  drop(e) {
    console.log(e.target)
    e.preventDefault();
    let type = e.dataTransfer.getData('text');
    this.appendQuestion(type);
  }


  render () {
    return (
      <div>
        <h2>Homework Builder</h2>
          <RaisedButton label="Save Homework"></RaisedButton>
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
          <div id="dropArea" onDragOver={this.preventDefault} onDrop={this.drop}>
            <h3>Drag to Here</h3>
            <div>{this.state.homework.map((question, i) => (<div key={i} id={i}>{question}</div>))}</div>
          </div>
        <div>
        </div>
      </div>
    )
  }
}

export default FormBuilder;
