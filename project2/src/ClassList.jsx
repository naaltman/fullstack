import React, { Component } from 'react';
import { Card, CardText,CardBody,
  CardTitle, CardSubtitle, Col,
  Container, Row, Jumbotron } from 'reactstrap';

class ClassList extends Component{
  constructor(props){
    super(props);
    this.state = {courses: []};
    this.getClassURL = this.getClassURL.bind(this);

  }

  getClassURL(semester, year, department, isCCC){
    var url = ""
    var baseURL = 'https://www.eg.bucknell.edu/~amm042/service/q?Semester=' +
      semester + '&Year=' + year + '&Department=' +
      department
    if(isCCC === 'No CCC'){
      var tempURL = baseURL + "&CCCReq=" + isCCC
      url= tempURL
    }
    if(url.length === 0){
      url = baseURL
    }
    return url
  }

  getRandomClass(foundClasses){
    var rand = parseInt(Math.random() * 9, 10)
    var randomClass = foundClasses[rand]
    return randomClass
  }

  componentWillMount(){
    // var url = ""
    if(this.state.courses.length === 0){
      var url = this.getClassURL(this.props.semester, this.props.year,
                              this.props.dept[0], this.props.foundCCC)
      var courseList = []
      console.log('fetching from url ' + url)
      fetch(url)
        .then(rsp => rsp.json())
        .then(classes =>{
          var randomClass = this.getRandomClass(classes.message)
          courseList.push(randomClass)
          /*  get 4 random classes all in the same
              department if only 1 department selected
          */
          if(this.props.dept.length === 1){
            console.log("length is 1")
            var classesFound = 1
            while(classesFound < 4){
              randomClass = this.getRandomClass(classes.message)
              console.log("found class " + randomClass.Course)
              // handle repeats
              while(courseList.includes(randomClass)){
                randomClass = this.getRandomClass(classes.message)
              }
              courseList.push(randomClass)
              this.setState({courses:courseList})
              classesFound +=1
            }
            // this.setState({courses: courseList})
          }
          if(this.props.dept.length === 2){
            console.log("length is 2")
            classesFound = 1
            while(classesFound < 3){
              randomClass = this.getRandomClass(classes.message)
              // handle repeats
              while(courseList.includes(randomClass)){
                randomClass = this.getRandomClass(classes.message)
              }
              courseList.push(randomClass)
              this.setState({courses:courseList})
              classesFound +=1
            }
            // this.setState({courses: courseList})
          }
          if(this.props.dept.length === 3){
            console.log("length is 3")
            classesFound = 1
            while(classesFound < 2){
              randomClass = this.getRandomClass(classes.message)
              // handle repeats
              while(courseList.includes(randomClass)){
                randomClass = this.getRandomClass(classes.message)
              }
              courseList.push(randomClass)
              classesFound +=1
              this.setState({courses:courseList})
            }
            // this.setState({courses: courseList})
          }
        })
        .catch(err => console.log("ERR",err))

        if(this.props.dept.length === 4){
          console.log("found 4 departments\nfetching the rest 3")

          // for error testing departments multiple selected
          for(var i = 0; i< this.props.dept.length; i++){
            console.log("dept entered " + this.props.dept[i])
          }

          var url2 = this.getClassURL(this.props.semester, this.props.year,
                                      this.props.dept[1], this.props.foundCCC)
          fetch(url2)
            .then(rsp => rsp.json())
            .then(classes =>{
              var randomClass = this.getRandomClass(classes.message)
              courseList.push(randomClass)
              this.setState({courses:courseList})
            })
            .catch(err => console.log("ERR",err))

          var url3 = this.getClassURL(this.props.semester, this.props.year,
                                      this.props.dept[2], this.props.foundCCC)
          fetch(url3)
          .then(rsp => rsp.json())
          .then(classes =>{
            var randomClass = this.getRandomClass(classes.message)
            courseList.push(randomClass)
            this.setState({courses:courseList})
          })
          .catch(err => console.log("ERR",err))

          console.log("fetching class in dept " + this.props.dept[3])
          var url4 = this.getClassURL(this.props.semester, this.props.year,
                                      this.props.dept[3], this.props.foundCCC)
          fetch(url4)
          .then(rsp => rsp.json())
          .then(classes =>{
            var randomClass = this.getRandomClass(classes.message)
            courseList.push(randomClass)
            this.setState({courses:courseList})
          })
          .catch(err => console.log("ERR",err))
          // this.setState({courses:courseList})
        // end tag for 4 departments
        }

        /* for 2 and 3 departments, repeat the first dept
          as many times until there are 4 total
        */
        if(this.props.dept.length === 2){
          console.log("fetching classes for 2nd department")
          var url5 = this.getClassURL(this.props.semester, this.props.year,
                                      this.props.dept[1], this.props.foundCCC)
          fetch(url5)
            .then(rsp => rsp.json())
            .then(classes =>{
              var randomClass = this.getRandomClass(classes.message)
              console.log("2nd random class " + randomClass.Title)
              courseList.push(randomClass)
              this.setState({courses: courseList})
            })
            .catch(err => console.log("ERR",err))
            // this.setState({courses: courseList})
        // end tag for 2 departments
        }

        if(this.props.dept.length === 3){
          var url6 = this.getClassURL(this.props.semester, this.props.year,
                                      this.props.dept[1], this.props.foundCCC)
          fetch(url6)
            .then(rsp => rsp.json())
            .then(classes =>{
              var randomClass = this.getRandomClass(classes.message)
              courseList.push(randomClass)
              this.setState({courses:courseList})
            })
            .catch(err => console.log("ERR",err))

            var url7 = this.getClassURL(this.props.semester, this.props.year,
                                        this.props.dept[1], this.props.foundCCC)
            fetch(url7)
              .then(rsp => rsp.json())
              .then(classes =>{
                var randomClass = this.getRandomClass(classes.message)
                courseList.push(randomClass)
                this.setState({courses:courseList})
              })
              .catch(err => console.log("ERR",err))
          // this.setState({courses: courseList})
        // end tag for 3 departments
        }
    // end tag for finding all courses
    }
  // end tag for component will mount
  }


  render(){
    var course1, course2, course3, course4, c1Timing, c1Title,
      c2Title, c3Title, c4Title, c2Timing, c3Timing, c4Timing;
    console.log("rendering: " + this.state.courses.length + " classes")
    if(this.state.courses.length > 0){
      for(var i = 0; i < this.state.courses.length; i++){
        console.log(this.state.courses[i].Course)
      }
    }
    if(this.state.courses.length === 4){
      course1 = this.state.courses[0].Course
      c1Title = this.state.courses[0].Title
      c1Timing = this.state.courses[0]["Meeting Time"]
      course2 = this.state.courses[1].Course
      c2Title = this.state.courses[1].Title
      c2Timing = this.state.courses[1]["Meeting Time"]
      course3 = this.state.courses[2].Course
      c3Title = this.state.courses[2].Title
      c3Timing = this.state.courses[2]["Meeting Time"]
      course4 = this.state.courses[3].Course
      c4Title = this.state.courses[3].Title
      c4Timing = this.state.courses[3]["Meeting Time"]

    }
    return (<div>
    <div id="bu-orange">
    <Jumbotron fluid id="bu-orange">
        <Container><center>
          <h1 id="open-sans">SCHEDULE PROTOTYPE</h1>
        </center></Container>
      </Jumbotron>
    </div>
    <div id="faded-blue">
    <Container id="faded-blue">
    <div id="faded-blue">
      <Col id="faded-blue" xl={{size:5, offset:3}}>
        <Row>
          <Card>
            <CardBody>
              <CardTitle id="gentium">{course1}</CardTitle>
              <CardSubtitle id="gentium">{c1Title}</CardSubtitle>
              <CardText id="gentium">{c1Timing}</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle id="gentium">{course2}</CardTitle>
              <CardSubtitle id="gentium">{c2Title}</CardSubtitle>
              <CardText id="gentium">{c2Timing}</CardText>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <CardTitle id="gentium">{course3}</CardTitle>
              <CardSubtitle id="gentium">{c3Title}</CardSubtitle>
              <CardText id="gentium">{c3Timing}</CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle id="gentium">{course4}</CardTitle>
              <CardSubtitle id="gentium">{c4Title}</CardSubtitle>
              <CardText id="gentium">{c4Timing}</CardText>
            </CardBody>
          </Card>
        </Row>
      </Col>
      </div>
    </Container>
    </div>
</div>);

  }
}

export default ClassList;
