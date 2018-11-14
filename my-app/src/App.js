import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import Blur from 'react-blur';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  filter: blur(${props => props.blurValue}px);
`;

const List = styled.ul`
  list-style-type: none;
  overflow-y: scroll
`;

const ListElement = styled.li`
  color: ${props => props.selected == props.value ? "blue" : "black"};
`;

const ConfirmButton = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SliderWidth = styled.div`
  width: 30%;
`;


const ImageContainer = styled.div`
  overflow: hidden;
  height: 500px;
  width: 500px;
  flex: 1;
  flex-direction: row;
`
class App extends Component {
  constructor(props) {
    super(props);
    this.switchTimer = setInterval(this.next,5000);
  }
  NUMIMAGESTEST = 3;
  imageBrowserNumber = this.NUMIMAGESTEST;
  clicks = 1;
  imageValue = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  result = []
  valueSelected = 50;
  recorded = false;
  state = {
    selected: 50
  }

  changeSelected = (value) => {
    if (this.clicks == 1){
      console.log(value);
      this.setState({selected: value});
      this.clicks -= 1;

      this.result.push({
        "ImageID": this.imageValue,
        "ImageBlur": value
      });
      this.forceUpdate();
    }
  }

onSliderChange = (value) => {
  this.setState({
    value,
  });
  this.forceUpdate();
}

  next = () => {
    if (this.recorded == false) {
      this.recorded = true;
      this.valueSelected = this.state.value;
      this.changeSelected(this.valueSelected);
    }
    this.imageBrowserNumber -= 1;
    console.log(this.switchTimer);
    if (this.imageBrowserNumber <= 0) {
      clearInterval(this.switchTimer);
    }
    this.setState({value: 50, selected: 50});
    this.clicks = 1;
    this.recorded = false;
    this.forceUpdate();
    //this.imageValue = newValue;
  }

  render() {
    return (
          <CenterContainer>
      {this.imageBrowserNumber == 0 ?
        <div className="App">
            <h3>{this.NUMIMAGESTEST} Images Viewed</h3>
            {this.result.map((test)=> (
                <List>
                  <li>
                    <hr />
                    <img width={100} height={100} src={test.ImageID} />
                    <h5>Blur Value: {test.ImageBlur}</h5>
                    <hr />
                  </li>
                </List>
              ))
            }
        </div>
        :
        <CenterContainer>
            <ImageContainer>
              <Image src={this.imageValue} blurValue={this.state.selected} />
            </ImageContainer>
            <SliderWidth>
              <Slider step={10} dots={true} defaultValue={50} value={this.state.value} onChange={this.onSliderChange} onAfterChange={this.onSliderChange}/>
            </SliderWidth>
            <ConfirmButton>
              <button onClick={() => {
                if (this.recorded == false) {
                  this.recorded = true;
                  this.valueSelected = this.state.value;
                  this.changeSelected(this.valueSelected);
                }
              }}>Confirm</button>
              <p>{this.recorded ? "Response recorded, click Next" : "Please Select a Value"}</p>
            </ConfirmButton>
            <button onClick={() => this.next()}>Next Image</button>
          </CenterContainer>
      }
    </CenterContainer>
    );
  }
}

export default App;
