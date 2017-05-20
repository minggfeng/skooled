import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        question: '',
        type: 'shortEssay'
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleQuestionChange(e) {
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
        <TextField hintText="Question" fullWidth value={this.state.question} onChange={this.handleQuestionChange}/>
        <br></br>
        <TextField hintText="Answer" fullWidth multiLine type="text" disabled/>
      </form>
    )
  }
}

export default EssayForm;
