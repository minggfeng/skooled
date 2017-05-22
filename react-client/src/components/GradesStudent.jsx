import React from 'react';
import axios from 'axios';
var Highcharts = require('highcharts');


class GradesStudent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      grades: [],
      GPAgrade:''
    }
  }

  componentWillMount(){
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };
    axios.get('/grades/student-grades?id='+this.props.firstName, config)
    .then(response => {
      this.setState({
        grades: response.data
      });

      var GPAgrade = this.calculateGrade();
      this.setState({
        GPAgrade: GPAgrade
      });

      this.plotChart("student-grades-chart", this.state.grades )
    })
    .catch(error => {
      console.log('error, received no response from server', error);
    });
  }

  calculateGrade(){
    var resultSum = 0;
    for(var i of this.state.grades){
      resultSum += this.getGPA(i.grade);
    }
    return this.getGrade(resultSum/this.state.grades.length);
  }

  getGPA(inpString){
    var result = 0;
      switch(inpString){
        case 'A':
          result=4;
          break;
        case 'B':
          result=3;
          break;
        case 'C':
          result=2;
          break;
        case 'D':
          result=1;
          break;
        case 'F':
          result=0;
          break;
        default:
          result=0;
      }
    return result;
  }

  getGrade(inpNum){
    if(inpNum >= 3.5){
      return 'A';
    }
    if(inpNum >= 2.5){
      return 'B';
    }
    if(inpNum >= 1.5){
      return 'C';
    }
    if(inpNum >= 1){
      return 'D'
    }
    return 'F'
  }

plotChart(elementId, options){

var keys = options.map(item => {
  return item.title;
})

var values = options.map(item => {
  return this.getGPA(item.grade);
})
console.log(keys, values);

Highcharts.chart(elementId, {

    title: {
        text: 'GPA by Homework'
    },

    yAxis: {
        title: {
            text: 'GPA'
        }
    },
    xAxis: {
        title: {
            text: 'Homework'
        },categories: keys,
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    series: [{
        name: 'GPA',
        data: values,
        color: '#009688'
    }]
  });
}

  render(){
    return(
      <div className="student-grades">
        <div className='main-grade-label'>Grade</div>

          <div className="main-grade grade grade-value"><span className={this.state.GPAgrade}>{this.state.GPAgrade}</span></div>
          <div className="row">
            <div className="row col-md-5">
            {
              this.state.grades.map((grade) =>
                (<div className="grade-card">
                <div className="col-md-6 homework-name">{grade.title}</div>
                <div className="col-md-6 grade-value"><span className={grade.grade}>{grade.grade}</span></div>
                </div>)
                )
            }
            </div>
          <div id="student-grades-chart" className="col-md-7"></div>
          </div>
      </div>
      )
  }
}

export default GradesStudent;
