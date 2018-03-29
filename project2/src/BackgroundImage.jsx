import React, {Component} from 'react';
class BackgroundImage extends Component{
  constructor(props){
    super(props)
    this.state = {x: "", y: ""}
  }

  componentWillMount(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({x:x,y:y});
  }
  render(){
    return(
      <div><img className='bg'
        src={'./planner.jpg'} alt="bg"/></div>);
  }

}

export default BackgroundImage;
