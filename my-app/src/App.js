import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
// import Blur from 'react-blur';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import _ from "lodash";

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

// const ListElement = styled.li`
//   color: ${props => props.selected === props.value ? "blue" : "black"};
// `;

const SliderWidth = styled.div`
  width: 100%;
  margin-bottom: 50px;
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
    this.imageSetUsed.add(-1);
    this.imageValue = this.grabRandomImage();
    // Every 5 seconds automatically move to the next image by calling NEXT function
    this.switchTimer = setInterval(this.next, 6000);
  }
  // The number of images to test (Also is the controller to clearing the interval)
  NUMIMAGESTEST = 60;
  // The image number reducer
  imageBrowserNumber = this.NUMIMAGESTEST;
  // The image that is currently being looked
  imageSet = [
    "./res/3.jpg",
    "./res/22.jpg",
    "./res/111.jpg",
    "./res/123.jpg",
    "./res/125.jpg",
    "./res/222.jpg",
    "./res/254.jpg",
    "./res/1202.jpg",
    "./res/1220.jpg",
    "./res/1234.jpg",
    "./res/1274.jpg",
    "./res/1323.jpg",
    "./res/1710.jpg",
    "./res/2160.jpg",
    "./res/2279.jpg",
    "./res/2314.jpg",
    "./res/2343.jpg",
    "./res/2410.jpg",
    "./res/2445.jpg",
    "./res/2692.jpg",
    "./res/2722.jpg",
    "./res/2751.jpg",
    "./res/2980.jpg",
    "./res/3001.jpg",
    "./res/3150.jpg",
    "./res/3195.jpg",
    "./res/3400.jpg",
    "./res/4600.jpg",
    "./res/5455.jpg",
    "./res/5566.jpg",
    "./res/5621.jpg",
    "./res/5829.jpg",
    "./res/6150.jpg",
    "./res/6550.jpg",
    "./res/7033.jpg",
    "./res/7044.jpg",
    "./res/7045.jpg",
    "./res/7077.jpg",
    "./res/7150.jpg",
    "./res/7170.jpg",
    "./res/7351.jpg",
    "./res/7632.jpg",
    "./res/7660.jpg",
    "./res/8230.jpg",
    "./res/9001.jpg",
    "./res/9042.jpg",
    "./res/9150.jpg",
    "./res/9260.jpg",
    "./res/9301.jpg",
    "./res/9395.jpg",
    "./res/9400.jpg",
    "./res/9405.jpg",
    "./res/9413.jpg",
    "./res/9810.jpg",
    "./res/9830.jpg",
    "./res/12321.jpg",
    "./res/13233.jpg",
    "./res/22222.jpg",
    "./res/30051.jpg",
    "./res/bbaby.jpg"
  ];
  imageValue = "";
  imageSetUsed = new Set();
  // Save the selected result in a tuple (Image ID, Opacity Value)
  result = []
  // Was an image selected or not
  recorded = false;
  // The initial value
  selected = 30;


  grabRandomImage = () => {
    let randNum = -1;
    while (this.imageSetUsed.has(randNum)) {
      // Random number 0 or 1
      randNum = Math.floor((Math.random() * 60));
    }
    this.imageSetUsed.add(randNum);
    console.log(this.imageSet, randNum, this.imageSet[randNum]);
    return this.imageSet[randNum];
  }


  /*
    This function registers the fact that the confirm button was clicked
    and that the user has SELECTED their Opacity.
    Value = Selected Opacity Level
   */
  changeSelected = (value) => {
    console.log(value);
    this.selected = value;
    this.result.push({
      "ImageID": this.imageValue,
      "ImageBlur": this.selected
    });
    this.forceUpdate();
  }

  /*
    This function controls the slider and updates the opacity Value Selected
    @param value = the new opacity selected
   */
  onSliderChange = _.debounce((value) => {
    if (this.recorded === false) {
      this.selected = value;
      this.recorded = true;
      this.forceUpdate();
      this.changeSelected(this.selected);
    }
  })

  /*
    This function registers when NEXT IMAGE BUTTON is clicked
   */
  next = _.debounce(() => {
    if (this.recorded === false) {
      this.recorded = true;
      this.changeSelected(this.selected);
    }
    this.imageBrowserNumber -= 1;
    console.log(this.switchTimer);
    // Clear the interval if this is the last image
    if (this.imageBrowserNumber <= 0) {
      console.log(this.result);
      clearInterval(this.switchTimer);
    } else {
      // Reset state to default and select new image
      this.selected = 30;
      this.recorded = false;
      this.imageValue = this.grabRandomImage();
    }
    this.forceUpdate();
  })

  render() {
    return (
          <CenterContainer>
      {this.imageBrowserNumber <= 0 ?
        <div className="App">
            <h3>{this.NUMIMAGESTEST} Images Viewed</h3>
            {this.result.map((test, key)=> (
                <List key={key}>
                  <li>
                    <hr />
                    <img width={100} height={100} src={require(`${test.ImageID}`)} alt=""/>
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
              <Image src={require(`${this.imageValue}`)} blurValue={this.selected} />
            </ImageContainer>
            <SliderWidth>
              <Slider disabled={this.recorded} step={10} dots={true} defaultValue={30} value={this.selected} onChange={this.onSliderChange} onAfterChange={this.onSliderChange} min={0} max={60}/>
            </SliderWidth>
          </CenterContainer>
      }
    </CenterContainer>
    );
  }
}

export default App;
