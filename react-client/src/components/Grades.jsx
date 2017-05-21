import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import $ from 'jquery';

window.j = $;

class Grades extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      classes: [],
      value: 'Please choose',
      homework: 'Please choose',
      studentsPerClass: [],
      homeworkPerClass: []
    }
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    // Make http request to obtain array of classes to populate the dropdown for classes.
    axios.get('/grades/classes', config)
    .then(response => {
      // console.log('Success getting classes list from db.', response.data);
      this.setState ({
        classes: response.data
      });
    })
    .catch(error => {
      console.error('Error getting classes list from db.', error);
    });
  }

  handleClassSelect(event, index, value){
    this.setState ({value});

    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('/grades/studentsPerClass?id='+value, config)
    .then(response => {
      console.log('Success getting classes list from db.', response.data);
      this.setState ({
        studentsPerClass: response.data
      });
    })
    .catch(error => {
      console.error('Error getting students per class list from db.', error);
    });

    axios.get('/grades/homeworkPerClass?id='+value, config)
    .then(response => {
      console.log('Success getting homework list from db.', response.data);
      // var homework = response.data.map((item) => {return item.title});
      this.setState ({
        homeworkPerClass: response.data
      });
    })
    .catch(error => {
      console.error('Error getting homework per class list from db.', error);
    });

  }

  handleHomeworkSelect(event, index, value){
    this.setState({homework: value})

  }

  handleChange (event, index, value2){
    this.setState({value});
  }


  handleTextChange(event){
    console.log(event.target.value);
  }

  handleSubmit(event){
    event.preventDefault();
    var grades = this.collectGradesData();
    this.postNewGrades(grades);
  }

  collectGradesData(){
    var gradesData = [];
    var grades = ['A', 'B', 'C', 'D', 'F', 'NA'];
    var $tablerows = $('.gradestablebody tr');
    for(var row of $tablerows){
      var tds = $(row).children();
      var name = $(tds[0]).text().split(' ')[0];
      var grade = $($(tds[1]).find('input')).val().toUpperCase();
      if(grades.includes(grade) === false){
        grade = 'NA'
      }
      for(var i of this.state.studentsPerClass){
        if(i.first_name === name){
          // var newObj = $.extend(true, {}, i)
          var newObj = {};
          newObj.student_id = i.id;
          newObj.class_id = this.state.value;
          newObj.grade = grade;
          newObj.homework_id = this.state.homework;
          gradesData.push(newObj);
          break;
        }
      }
    }
    console.log('grades: ', gradesData)
    return gradesData;
  }

  postNewGrades(grades){
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    // var gradesData = { id_class: this.state.value, grades: grades };
    axios.post('/grades/insertgrades', grades, config)
    .then(response => {
      console.log('Successfully added parent to db.', response);
    })
    .catch(error => {
      console.error('Failed to add parent to db.', error);
    });
  }

  render(){
    console.log('homework',this.state.homeworkPerClass)
    console.log('student', this.state.studentsPerClass)
    return(
      <div>
         <h2>Grades</h2>
         <DropDownMenu onChange={this.handleClassSelect.bind(this)} value={this.state.value} >
            <MenuItem value={'Please choose'} primaryText='Choose Class' />
            {this.state.classes.map((subject, index) =>(
              <MenuItem key={index} value={subject.id} primaryText={subject.name} />
            ))}
         </DropDownMenu>
         <DropDownMenu onChange={this.handleHomeworkSelect.bind(this)} value={this.state.homework} >
            <MenuItem value={'Please choose'} primaryText='Choose Homework' />
            {this.state.homeworkPerClass.map((item, index) =>(
              <MenuItem key={index} value={item.id} primaryText={item.title} />
            ))}
         </DropDownMenu>
         <Table
            fixedHeader={true}
            selectable={false}
          >
           <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
            >
              <TableRow>
                  <TableHeaderColumn colSpan="2" tooltip="Grade for class " style={{textAlign: 'center'}}>
                    Grades for class
                  </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Student</TableHeaderColumn>
                <TableHeaderColumn>Grade</TableHeaderColumn>
              </TableRow>
           </TableHeader>
           <TableBody
              displayRowCheckbox={false}
              showRowHover={false}
              stripedRows={false} className="gradestablebody"
            >
            {this.state.studentsPerClass.map( (row, index) => (
            <TableRow key={index} >
              <TableRowColumn>{row.first_name + ' ' + row.last_name}</TableRowColumn>
             <TableRowColumn ><TextField ref='name' hintText="Enter Grade"  onChange={this.handleTextChange.bind(this)} /></TableRowColumn>
            </TableRow>
            ))}
           </TableBody>

         </Table>
         <RaisedButton label="Submit" primary={true} style={{margin: 12}} onClick={this.handleSubmit.bind(this)} />
     </div>)
  }
}

export default Grades;
