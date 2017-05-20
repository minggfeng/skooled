import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

class EssayFormReleased extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        type: 'shortEssay'
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleAnswerChange(e) {
    let question = e.target.value;

    this.setState({
      question: question
    }, () => {
      let questionObj = this.state;
      this.props.onChange(this.props.id, questionObj)
    })
  }

  render() {
    return (
      <form>
        <TextField hintText="Question" fullWidth value={this.state.question} disabled/>
        <br></br>
        <TextField hintText="Answer" fullWidth multiLine type="text" onChange={this.handleAnswerChange}/>
      </form>
    )
  }
}

export default EssayFormReleased;