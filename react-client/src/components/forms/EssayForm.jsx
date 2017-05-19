import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        question: ''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleQuestionChange(e) {
    this.setState({
      question: e.target.value
    })
  }

  handleEssaySave(e) {
    e.preventDefault();
    console.log('save essay')
  }

  render() {
    return (
      <div className="essayForm">
        <form>
          <TextField hintText="Question" fullWidth value={this.state.question} onChange={this.handleQuestionChange}/>
          <br></br>
          <TextField hintText="Answer" fullWidth multiLine type="text" disabled/>
        </form>
      </div>
    )
  }
}

export default EssayForm;