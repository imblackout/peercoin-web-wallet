import React from "react";
import Slider from "react-slick";

import {
    CircularProgressbarWithChildren,
    buildStyles,
  } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true,
      autoplay: true
    };
    return (
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
    );
  }
}
export default SimpleSlider;