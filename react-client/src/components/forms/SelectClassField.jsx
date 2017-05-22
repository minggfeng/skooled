import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class SelectClassField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index, values) {
    this.setState({
      values: []
    }, () => {
      this.setState({values}, () => {
        this.props.handleSelected(values);
      })
    })
  }

  menuItems(classes) {
    return classes.map((classObj) => (
      <MenuItem
        key={classObj.id}
        value={classObj.id}
        primaryText={classObj.name}
      />
    ));
  }

  render() {
    const {values} = this.state;
    return (
      <div>
        <SelectField
          hintText="Select Class"
          value={values}
          onChange={this.handleChange}
        >
          {this.menuItems(this.props.classes)}
        </SelectField>
      </div>
    );
  }
}

export default SelectClassField;