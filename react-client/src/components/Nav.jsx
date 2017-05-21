import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="logout"><MenuItem primaryText="Sign out" /></Link>
  </IconMenu>
);

const MoreMenuTeacher = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MenuIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/"><MenuItem primaryText="Home" /></Link>
    <Link to="studentList"><MenuItem primaryText="Students" /></Link>
    <Link to="classList"><MenuItem primaryText="Classes" /></Link>
    <Link to="homework"><MenuItem primaryText="Homework Forms" /></Link>
    <Link to="formBuilder"><MenuItem primaryText="Homework Builder" /></Link>
    <Link to="grades"><MenuItem primaryText="GradeBook" /></Link>
    <Link to="documents"><MenuItem primaryText="Permission Slips" /></Link>
    <Link to="video"><MenuItem primaryText="Video" /></Link>
    <Link to="message"><MenuItem primaryText="Message" /></Link>
    <Link to="admin"><MenuItem primaryText="Create User" /></Link>
  </IconMenu>
);

const MoreMenuParent = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MenuIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/"><MenuItem primaryText="Home" /></Link>
    <Link to="documents"><MenuItem primaryText="Permission Slips" /></Link>
    <Link to="video"><MenuItem primaryText="Video" /></Link>
    <Link to="donate"><MenuItem primaryText="Donate" /></Link>
  </IconMenu>
);

const MoreMenuStudent = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MenuIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <Link to="/"><MenuItem primaryText="Home" /></Link>
    <Link to="video"><MenuItem primaryText="Video" /></Link>
  </IconMenu>
);

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.onRightIconClick = this.onRightIconClick.bind(this);
  }

  onRightIconClick() {
    <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    <Link to="logout"><MenuItem primaryText="Sign out" /></Link>
  </IconMenu>
  }

  render() {
    console.log(this.props)
    if (this.props.userType === 'teacher') {
    return (
      <AppBar
        title="SkooledDS"
        onTitleTouchTap={() => <Redirect/>}
        iconElementLeft={<MoreMenuTeacher />}
        iconElementRight={<Logged /> } />
    )
  } else if (this.props.userType === 'student') {
    return (
    <AppBar
      title="SkooledDS"
      onTitleTouchTap={() => <Redirect/>}
      iconElementLeft={<MoreMenuStudent />}
      iconElementRight={<Logged /> } />
    )
  } else {
    return (
      <AppBar
        title="SkooledDS"
        onTitleTouchTap={() => <Redirect/>}
        iconElementLeft={<MoreMenuParent />}
        iconElementRight={<Logged /> } />
      )
    }
  }
}

export default Nav;
