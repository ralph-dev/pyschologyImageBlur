import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import Blur from 'react-blur';

const CenterContainer = styled.div`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
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


const ImageContainer = styled.div`
  overflow: hidden;
  height: 500px;
  width: 500px;
`
class App extends Component {
  NUMIMAGESTEST = 10;
  imageBrowserNumber = this.NUMIMAGESTEST;
  clicks = 1;
  imageValue = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";
  result = []
  state = {
    selected: 50
  }

  changeSelected = (value) => {
    if (this.clicks == 1){
      this.setState({selected: value});
      this.clicks -= 1;
      this.imageBrowserNumber -= 1;
      this.result.push({
        "ImageID": this.imageValue,
        "ImageBlur": this.state.selected
      });
    }
  }

  next = () => {
    this.setState({selected: 50});
    this.clicks = 1;
    //this.imageValue = newValue;
  }

  render() {
    return (
          <CenterContainer>
      {this.imageBrowserNumber == 0 ?
        <div className="App">
            {this.result.map((test)=> (
                <ol>
                  <li>
                    <p>{test.ImageID}</p>
                    <h5>{test.ImageBlur}</h5>
                  </li>
                </ol>
              ))
            }
            <button onClick={() => this.imageBrowserNumber = this.NUMIMAGESTEST}>Reset Test</button>
        </div>
        :
        <CenterContainer>
            <ImageContainer>
              <Image src={this.imageValue} blurValue={this.state.selected} />
            </ImageContainer>
            <List>
              <ListElement value={0} selected={this.state.selected} onClick={() => this.changeSelected(0)}>No Blur</ListElement>
              <ListElement value={10} selected={this.state.selected} onClick={() => this.changeSelected(10)}>10% Blur</ListElement>
              <ListElement value={20} selected={this.state.selected} onClick={() => this.changeSelected(20)}>20% Blur</ListElement>
              <ListElement value={30} selected={this.state.selected} onClick={() => this.changeSelected(30)}>30% Blur</ListElement>
              <ListElement value={40} selected={this.state.selected} onClick={() => this.changeSelected(40)}>40% Blur</ListElement>
              <ListElement value={50} selected={this.state.selected} onClick={() => this.changeSelected(50)}>50% Blur</ListElement>
              <ListElement value={60} selected={this.state.selected} onClick={() => this.changeSelected(60)}>60% Blur</ListElement>
              <ListElement value={70} selected={this.state.selected} onClick={() => this.changeSelected(70)}>70% Blur</ListElement>
              <ListElement value={80} selected={this.state.selected} onClick={() => this.changeSelected(80)}>80% Blur</ListElement>
              <ListElement value={90} selected={this.state.selected} onClick={() => this.changeSelected(90)}>90% Blur</ListElement>
              <ListElement value={100} selected={this.state.selected} onClick={() => this.changeSelected(100)}>100% Blur</ListElement>
            </List>
            <button onClick={() => this.next()}>Next Image</button>
          </CenterContainer>
      }
    </CenterContainer>
    );
  }
}

export default App;
