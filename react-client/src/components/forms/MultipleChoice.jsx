import React from 'react';
import ReactDOM from 'react-dom';

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        question: 'Question',
        optionOne: 'Option 1',
        optionTwo: 'Option 2',
        optionThree: 'Option 3'
    }
    this.handleMultipleChoiceSave = this.handleMultipleChoiceSave.bind(this);
    this.handleMultipleChoiceTitleChange = this.handleMultipleChoiceTitleChange.bind(this);
    this.handleChangeOptionOne = this.handleChangeOptionOne.bind(this);
    this.handleChangeOptionTwo = this.handleChangeOptionTwo.bind(this);
    this.handleChangeOptionThree = this.handleChangeOptionThree.bind(this);
  }

  handleMultipleChoiceTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleChangeOptionOne(e) {
    this.setState({
      optionOne: e.target.value
    })
  }

  handleChangeOptionTwo(e) {
    this.setState({
      optionTwo: e.target.value
    })
  }

  handleChangeOptionThree(e) {
    this.setState({
      optionThree: e.target.value
    })
  }

  handleMultipleChoiceSave(e) {
    e.preventDefault();
    console.log('submit');
  }

  render() {
    return (
      <div className="multipleChoice">
        <form onSubmit={this.handleMultipleChoiceSave}>
            <input type="text" value={this.state.question} onChange={this.handleMultipleChoiceTitleChange}/>
            <div>
              <input type="radio" value="option1" checked={false} />
              <input type="text" value={this.state.optionOne} onChange={this.handleChangeOptionOne}/>
            </div>
             <div>
              <input type="radio" value="option2" checked={false} />
              <input type="text" value={this.state.optionTwo} onChange={this.handleChangeOptionTwo} />
            </div>
            <div>
              <input type="radio" value="option3" checked={false} />
              <input type="text" value={this.state.optionThree} onChange={this.handleChangeOptionThree}/>
            </div>
            <input type="submit" value="Save Question"/>
        </form>
      </div>
    )
  }
}

export default MultipleChoice;