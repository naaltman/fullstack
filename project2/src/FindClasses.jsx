import React, { Component } from 'react';
import {Container, Button, Row,
  Form, FormGroup, Label, Input, Col} from 'reactstrap';
import ClassList from './ClassList';
import './style.css'
import BackgroundImage from './BackgroundImage';

class FindClasses extends Component{
  constructor(props){
    super(props);
    this.state = {semester: "Fall",
                year: "2018",
                timing: "",
                findCCC:'No CCC',
                departments: [],
                loadSchedule: false};
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeSemester = this.handleChangeSemester.bind(this);
    this.handleChangeCCC = this.handleChangeCCC.bind(this);
    this.handleChangeTiming = this.handleChangeTiming.bind(this);
    this.handleChangeDepartments = this.handleChangeDepartments.bind(this);
    this.shouldLoadSchedule = this.shouldLoadSchedule.bind(this);
  }

  handleChangeYear(event){
    this.setState({year: event.target.value})
  }

  handleChangeSemester(event){
    this.setState({semester: event.target.value})
  }

  handleChangeCCC(event){
    this.setState({findCCC: event.target.value})
  }

  handleChangeTiming(event){
    this.setState({timing: event.target.value})
  }

  handleChangeDepartments(event){
    var depts = this.state.departments
    depts.push(event.target.value)
    this.setState({departments:depts})
  }

  shouldLoadSchedule(){
    console.log("prev state " + this.state.showSchedule)
    this.setState({loadSchedule: true})
    console.log("new state " + this.state.loadSchedule)
  }

  render(){
    if (!this.state.loadSchedule){
      return (<div><BackgroundImage/>
        <Col>
          <Col>
            <h1 sm={{size: 6, order: 2, offset: 3}}
              id="open-sans"><center>COURSE DESIGNER</center></h1>
          </Col>
        </Col>

        <Container>
          <Col>
          <Col>
          <Form id="gentium" onSubmit={this.handleSubmit}>
            <Col lg={{ size: 4, offset: 5 }}>
              <Row>
              <FormGroup>
                 <Label for="selectYear">WHAT YEAR DO YOU WANT?</Label>
                 <Input type="text" value = {this.state.value}
                   onChange={this.handleChangeYear} id="selectYear"
                   placeholder="Enter the Year" />
              </FormGroup>
              </Row>
            </Col>
            <Row>
              <Col lg={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="semesterSelect">WHAT SEMESTER ARE YOU PLANNING FOR?</Label>
                <Input type="select" name="select" id="semesterSelect"
                  value={this.state.semester}
                  onChange={this.handleChangeSemester}>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col lg={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="cccSelect">ARE YOU FILLING A CCC REQUIREMENT?</Label>
                <Input type="select" name="select" id="cccSelect"
                  onChange={this.handleChangeCCC}>
                  <option value="ARHC">Arts & Humanities</option>
                  <option value="DUSC"> Diversity in the US</option>
                  <option value="ESSC">
                    Engineering Social Science</option>
                  <option value="CCIP">IP</option>
                  <option value="LBSC">Lab Science</option>
                  <option value="NSMC">
                    Natural Science & Math</option>
                  <option value="W2">W2</option>
                  <option value="No CCC">Not Looking for a CCC</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="deptSelect">WHICH DEPARTMENTS? (Select Up to 4)</Label>
                <Input type="select" name="select" id="deptSelect"
                  onClick={this.handleChangeDepartments} multiple>
                  <option value="CSCI">Computer Science</option>
                  <option value="ECON">Economics</option>
                  <option value="ENGL">English</option>
                  <option value="ENFS">Film & Media Studies</option>
                  <option value="MATH">Math</option>
                  <option value="MIDE">MIDE</option>
                  <option value="PHYS">Physics</option>
                  <option value="POLS">Political Science</option>
                  <option value="UNIV">University Course</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
              <Col sm={{ size: 4, offset:5 }}>
                <Button onClick={this.shouldLoadSchedule} label="Action">
                  SUBMIT</Button>
              </Col>
            </Form>
          </Col>
            </Col>
          </Container>
        </div>
    );}
    else{
      return (<ClassList dept={this.state.departments}
        semester={this.state.semester} year={this.state.year}/>);
    }
  }
}

export default FindClasses;
