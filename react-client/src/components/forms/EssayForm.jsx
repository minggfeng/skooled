import React from 'react';
import ReactDOM from 'react-dom';

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        question: 'Question'
    }
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
        <form onSubmit={this.handleEssaySave}>
          <input type="text" value={this.state.question} onChange={this.handleQuestionChange}/>
          <br></br>
          <textarea />
        </form>
        <input type="submit" value="Save Question"/>
      </div>
    )
  }
}

export default EssayForm;