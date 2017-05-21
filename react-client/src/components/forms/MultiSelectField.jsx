import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class MultiSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e, index, values) {
    this.setState({
      values: []
    }, () => {
      this.setState({values})
    })
  }

  handleSelect(e) {
    e.preventDefault();
    this.props.handleSelectedClasses(this.state.values);
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
          multiple={true}
          hintText="Assign to a Class"
          value={values}
          onChange={this.handleChange}
        >
          {this.menuItems(this.props.classes)}
        </SelectField>
        <div>
        <RaisedButton 
          label="Assign"
          onClick={this.handleSelect}>
        </RaisedButton>
        </div>
      </div>
    );
  }
}

export default MultiSelectField;
