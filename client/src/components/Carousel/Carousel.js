import React from 'react'
import { Carousel} from 'react-bootstrap';

export default function Carousels(props) {
  return (
    <Carousel>
    {props.links?props.links.map(img=>(
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="First slide"
        />
      </Carousel.Item>
    )):null}
  </Carousel>
  )
}


