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
    var launchYearValue= e.target.innerText;
    fetch('https://api.spaceXdata.com/v3/launches?limit=100')
  .then(response => response.json())
  .then(data => {this.setState({launchYear:data})});
    var dataApi = this.state.launchYear.filter(item => {return (item.launch_year === launchYearValue )});
    this.setState({data:dataApi})
  }
  render(){
    return(
      <div className="App">
      <p className="App-header">SpaceX Launch Programs</p>
      <Row className="show-grid">
        <Col md={2} className="Filter">
        <Col>
        <p className="FiltersTitle"><strong>Filters</strong></p>
        <div className="FilterHeaders"><span>Launch Year</span></div>
        <div>
        {this.state.years.map((item,i) => {
          return (
            <Col md={5} className="FilterYear">
            <div key={i}>
            <Button className="YearButton" onClick={this.launchYear} >{item}</Button>
            </div>
            </Col>
            )})}
        </div>
        </Col>
    
        <Col md={12}>
        <br/>
        <div className="FilterHeaders"><span>Successful Launch</span></div>
        <div>
        <Col md={5} className="FilterYear"><Button className="YearButton" onClick={this.launch}>True</Button></Col>
        <Col md={5} className="FilterYear"><Button className="YearButton" onClick={this.launch}>False</Button></Col>
        </div>
        </Col>
        <Col md={12}>
        <br/>
        <div className="FilterHeaders"><span>Successful Landing</span></div>
        <div>
        <Col md={5} className="FilterYear"><Button className="YearButton" onClick={this.land}>True</Button></Col>
        <Col md={5} className="FilterYear"><Button className="YearButton" onClick={this.land}>False</Button></Col>
        </div>
        </Col>
        </Col>
        <Col md={9}>
        {this.state.data.length !== 0 ? this.state.data.map((item,index) =>{
        return(
        <Col md={3} className="FilterData">
        <div key={index}>
        
        <img 
      src={item.links.mission_patch_small}
      alt="aircraftImage"
      />
          <div className= "MissionName">{item.mission_name} # {item.flight_number}</div>
          <div><strong>Mission Ids: </strong><span style={{color:"#5e66a4"}}>{item.mission_id.length === 0 ? <ul><li>no mission id</li></ul> : <ul><li>{item.mission_id}</li></ul>}</span></div>
          <div style={{marginBottom:"5px"}}><strong>Launch Year: </strong><span style={{color:"#5e66a4", paddingLeft:"30px"}}>{item.launch_year}</span></div>
          <div style={{marginBottom:"5px"}}><strong>Successful </strong><span style ={{paddingLeft:"50px", color:"#5e66a4"}}>{item.launch_success === false ? "False" : "True"}</span> <br /> <strong>Launch:</strong></div>
          <div style={{marginBottom:"20px"}}><strong>Successful </strong><span style={{paddingLeft:"50px", color:"#5e66a4"}}>{item.land_success === false ? "False" : "True"}</span><br /> <strong>Landing:</strong></div>
          </div>
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
