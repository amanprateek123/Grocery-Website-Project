import React, { Component } from 'react';
import { Carousel} from 'react-bootstrap';

export default class Carousels extends Component {
    render() {
        return (
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/2007015_breakfast-store_460.jpg"
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/2007014_tea-time-snacking_460.jpg"
      alt="Third slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.bigbasket.com/media/uploads/banner_images/T1_All_Proteinstore_DT_11_1600x460_17thJuly.jpg"
      alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>
        )
    }
}
