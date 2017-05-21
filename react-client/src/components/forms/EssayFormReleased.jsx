import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class EssayFormReleased extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        type: 'shortEssay',
        answer: ''
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleAnswerChange(e) {
    let answer = e.target.value;

    this.setState({
      answer: answer
    })
  }

  render() {
    return (
      <div className="question">
        <label>{this.props.question.question}
        <TextField id="answer" hintText="Answer" fullWidth multiLine  onChange={this.handleAnswerChange}/>
        </label>
      </div>
    )
  }
}

export default EssayFormReleased;