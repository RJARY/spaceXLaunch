import React, { Component } from "react";
import './App.css';
import { Button, Col, Row } from "react-bootstrap";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      show: true,
      data:[],
      land:[],
      launch:[],
      launchYear:[],
      years:[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
    }
  }
  componentDidMount(){
    fetch('https://api.spaceXdata.com/v3/launches?limit=100')
  .then(response => response.json())
  .then(data => {this.setState({data:data})});
  }
  land = e => {
    e.preventDefault();
    if(e.target.innerText === "True"){
      fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true')
  .then(response => response.json())
  .then(data => {this.setState({data:data})});
    }
    else{
      alert("No Data!!!")
    }
  }
  launch = e => {
    e.preventDefault();

    if(e.target.innerText === "True"){
      fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true')
  .then(response => response.json())
  .then(data => {this.setState({data:data})});
    }
    else{
      fetch('https://api.spaceXdata.com/v3/launches?limit=100')
      .then(response => response.json())
      .then(data => {this.setState({launch:data})});
      var falseLaunch = this.state.launch.filter(item =>{return(item.launch_success === false)})
      this.setState({data: falseLaunch});
    }
  }
  launchYear = e => {
    e.preventDefault();
    var launchYear= e.target.innerText;
    fetch('https://api.spaceXdata.com/v3/launches?limit=100')
  .then(response => response.json())
  .then(data => {this.setState({launchYear:data})});
    var dataApi = this.state.launchYear.filter(item => {return (item.launch_year === launchYear )});
    this.setState({data:dataApi})
  }
  render(){
    return(
      <div className="App">
      <p className="App-header">SpaceX Launch Programs</p>
      <Row className="show-grid">
        <Col md={2} className="Filter">
        <Col>
        <p><b>Filters</b></p>
        <p style={{textAlign:"center"}}>Launch Year</p>
        <hr/>
        <div>
        {this.state.years.map(item => {
          return (
            <Col md={4} className="FilterYear">
            <Button variant="primary" onClick={this.launchYear}>{item}</Button>
            </Col>
            )})}
        </div>
        <br/>
        </Col>
    
        <Col md={12}>
        <br/>
        <div><p style={{textAlign:"center"}}>Successful Launch</p>
        <hr/></div>
        
        <div>
        <Col md={4} className="FilterYear"><Button variant="primary" onClick={this.launch}>True</Button></Col>
        <Col md={4} className="FilterYear"><Button variant="outline-primary" onClick={this.launch}>False</Button></Col>
        </div>
        </Col>
        <Col md={12}>
        <p style={{textAlign:"center"}}>Successful Landing</p>
        <hr/>
        <div>
        <Col md={4} className="FilterYear"><Button variant="primary" onClick={this.land}>True</Button></Col>
        <Col md={4} className="FilterYear"><Button variant="outline-primary" onClick={this.land}>False</Button></Col>
        </div>
        </Col>
        </Col>
        <Col md={9}>
        {this.state.data.length !== 0 ? this.state.data.map(item =>{
        return(
        <Col md={2} className="Filter">
        
        <img 
      src={item.links.mission_patch_small}
      alt="new"
      />
          <div style={{color:"blue",fontWeight:"bold"}}>{item.mission_name} # {item.flight_number}</div>
          <div><b>Mission Ids: </b><span style={{color:"#6495ED"}}>{item.mission_id}</span></div>
          <div><b>Launch Year: </b><span style={{color:"#6495ED"}}>{item.launch_year}</span></div>
          <div><b>Successful Launch: </b><span style ={{color:"#6495ED"}}>{item.launch_success === false ? "false" : "true"}</span></div>
          <div><b>Successful Landing: </b><span style={{color:"#6495ED"}}>{item.land_success === false ? "false" : "true"}</span></div>
        </Col>
        )})
        : ""
        }
        </Col>
      </Row>
      <p className="Footer">Developed by: Raj Aryan</p>
      </div>
    )
  }
}
export default App;
