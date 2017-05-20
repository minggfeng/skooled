import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';

class MultipleChoiceReleased extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        type: 'multipleChoice'
    }
  }

  render() {
    return (
      <div className="multipleChoice">
        <form>
            <TextField id="question" fullWidth hintText="Question" value={this.props.question.question} disabled/>
            <div>
              <span><RadioButton id="radioOne" /></span>
              <span><TextField id="textOne" fullWidth value={this.props.question.optionOne} disabled/></span>
            </div>
             <div>
              <RadioButton id="radioTwo"/>
              <TextField id="textTwo" fullWidth value={this.props.question.optionTwo} disabled/>
            </div>
            <div>
              <RadioButton id="radioThree" />
              <TextField id="textThree" fullWidth value={this.props.question.optionThree} disabled/>
            </div>
        </form>
      </div>
    )
  }
}

export default MultipleChoiceReleased;
