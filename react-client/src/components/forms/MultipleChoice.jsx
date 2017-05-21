import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import {GridList, GridTile} from 'material-ui/GridList';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  radioButton: {
    width: '20px',
    marginTop: '5px'
  },
  gridTile: {
    paddingBottom: '0px',
    marginBottom: '0px',
    paddingTop: '0px',
    marginTop: '0px'
  }
};

class MultipleChoice extends React.Component {
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
      <div className="formBuilder">
        <TextField id="question" fullWidth hintText="Question" multiLine value={this.state.question} onChange={this.handleMultipleChoiceTitleChange}/>
        <div style={styles.root}>
          <GridList cols={10} cellHeight={'auto'}>
            <GridTile cols={1}>
              <RadioButton id="radioOne" checked={false} disabled={true} iconStyle={styles.radioButton}/>
            </GridTile>

            <GridTile cols={9}>
              <TextField style={styles.gridTile} fullWidth multiLine hintText="Option 1" id="textOne" value={this.state.optionOne} onChange={this.handleChangeOptionOne}/>
            </GridTile>

            <GridTile cols={1}>
              <RadioButton id="radioTwo" checked={false} disabled iconStyle={styles.radioButton}/>
            </GridTile>

            <GridTile cols={9}>
              <TextField id="textTwo" fullWidth multiLine hintText="Option 2" value={this.state.optionTwo} onChange={this.handleChangeOptionTwo} />
            </GridTile>

            <GridTile cols={1}>
              <RadioButton id="radioThree" checked={false} disabled iconStyle={styles.radioButton}/>
            </GridTile>

            <GridTile cols={9}>
              <TextField id="textThree" fullWidth multiLine hintText="Option 3" value={this.state.optionThree} onChange={this.handleChangeOptionThree}/>
            </GridTile>

          </GridList>
        </div>
      </div>
    )
  }
}

export default MultipleChoice;
