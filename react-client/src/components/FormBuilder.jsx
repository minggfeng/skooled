import React from 'react';
import ReactDOM from 'react-dom';
import MultipleChoice from './forms/MultipleChoice.jsx';
import EssayForm from './forms/EssayForm.jsx';
import $ from 'jquery'

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';



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
    e.preventDefault();
    let type = e.dataTransfer.getData('text');
    this.appendQuestion(type);
  }

  render () {
    return (
      <div>
        Homework Builder
        <div>
          <div id="dropArea" onDragOver={this.preventDefault} onDrop={this.drop}>Drag to Here
            <div>{this.state.homework.map((question, i) => (<div key={i} id={i}>{question}</div>))}</div>
          </div>
          <button>Save Homework</button>
        </div>
        <br></br>

        <div draggable="true" id="shortEssay" onDragStart={(e) => {this.drag(e)}}>Short Essay</div>
        <div draggable="true" id="multipleChoice" onDragStart={(e) => {this.drag(e)}}>Multiple Choice</div>

      </div>
    )
  }
}

export default FormBuilder;
