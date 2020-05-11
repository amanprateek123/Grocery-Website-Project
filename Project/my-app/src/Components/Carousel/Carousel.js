import React, { Component } from 'react';
import { Carousel} from 'react-bootstrap';

export default class Carousels extends Component {
    render() {
        return (
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/2004225_essentials_400_17thApr.jpg"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/All_Organicstore_DT_5_1130x400_25thApr.jpg"
      alt="Third slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/All_HowtobeaCaringSHopper_DT_2_1130x400_25thApr.jpg"
      alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>
        )
    }
}
