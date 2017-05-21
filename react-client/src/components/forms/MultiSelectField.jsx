import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class MultiSelectField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, index, values) {
    this.setState({values}, () => {
      this.props.handleSelectedClasses(values);
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
      <SelectField
        multiple={true}
        hintText="Assign to a Class"
        value={values}
        onChange={this.handleChange}
      >
        {this.menuItems(this.props.classes)}
      </SelectField>
    );
  }
}

export default MultiSelectField;
