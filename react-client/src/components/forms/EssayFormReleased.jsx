import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

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
      <form>
        <TextField id="question" fullWidth value={this.props.question.question} disabled/>
        <br></br>
        <TextField id="answer" hintText="Answer" fullWidth multiLine type="text" onChange={this.handleAnswerChange}/>
      </form>
    )
  }
}

export default EssayFormReleased;