import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';

const styles = {
  block: {
    maxWidth: 500
  },
  radioButton: {
    marginBottom: 16
  },
  radioIcon: {
    width: '20px',
  }
};

class MultipleChoiceReleased extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        type: 'multipleChoice'
    }
  }

  handleOnChange(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <div className="question">
        <label>{this.props.question.question}
        <br></br>
        <RadioButtonGroup name={this.props.question.question} onChange={this.handleOnChange} style={styles.block}>
          <RadioButton id="radioOne" label={this.props.question.optionOne} value={this.props.question.optionOne} style={styles.radioButton} iconStyle={styles.radioIcon}/>
          <RadioButton id="radioTwo" label={this.props.question.optionTwo} value={this.props.question.optionTwo} style={styles.radioButton} iconStyle={styles.radioIcon}/>
          <RadioButton id="radioThree" label={this.props.question.optionThree} value={this.props.question.optionThree} style={styles.radioButton} iconStyle={styles.radioIcon}/>
        </RadioButtonGroup>
        </label>
      </div>
    )
  }
}

export default MultipleChoiceReleased;
