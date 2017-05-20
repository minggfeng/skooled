import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';

class MultipleChoiceReleased extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        question: '',
        optionOne: '',
        optionTwo: '',
        optionThree: '',
        type: 'multipleChoice'
    }
    this.handleMultipleChoiceTitleChange = this.handleMultipleChoiceTitleChange.bind(this);
    this.handleChangeOptionOne = this.handleChangeOptionOne.bind(this);
    this.handleChangeOptionTwo = this.handleChangeOptionTwo.bind(this);
    this.handleChangeOptionThree = this.handleChangeOptionThree.bind(this);
  }

  handleMultipleChoiceTitleChange(e) {
    let title = e.target.value
    this.setState({
      question: title
    }, () => {
      let questionObj = this.state;
      this.props.onChange(this.props.id, questionObj);
    })
  }

  handleChangeOptionOne(e) {
    this.setState({
      optionOne: e.target.value
    }, () => {
      let questionObj = this.state;
      this.props.onChange(this.props.id, questionObj);
    })
  }

  handleChangeOptionTwo(e) {
    this.setState({
      optionTwo: e.target.value
    }, () => {
      let questionObj = this.state;
      this.props.onChange(this.props.id, questionObj);
    })
  }

  handleChangeOptionThree(e) {
    this.setState({
      optionThree: e.target.value
    }, () => {
      let questionObj = this.state;
      this.props.onChange(this.props.id, questionObj);
    })
  }

  render() {
    return (
      <div className="multipleChoice">
        <form>
            <TextField id="question" fullWidth hintText="Question" value={this.state.question} onChange={this.handleMultipleChoiceTitleChange}/>
            <div>
              <span><RadioButton id="radioOne" checked={false} disabled={true}/></span>
              <span><TextField fullWidth hintText="Option 1" id="textOne" value={this.state.optionOne} onChange={this.handleChangeOptionOne}/></span>
            </div>
             <div>
              <RadioButton id="radioTwo" checked={false} disabled/>
              <TextField id="textTwo" fullWidth hintText="Option 2" value={this.state.optionTwo} onChange={this.handleChangeOptionTwo} />
            </div>
            <div>
              <RadioButton id="radioThree" checked={false} disabled/>
              <TextField id="textThree" fullWidth hintText="Option 3" value={this.state.optionThree} onChange={this.handleChangeOptionThree}/>
            </div>
        </form>
      </div>
    )
  }
}

export default MultipleChoiceReleased;