import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import './Carousel.scss'
export default function Carousels(){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return(
        <Carousel 
        responsive={responsive}        
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/c8c04af9-f276-4c87-865a-a37f8ee12a0a1590039953155-Levis.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/49e0529b-f16e-488e-baea-f3fe7f41f4d31590039953100-Hrx.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/9e51b35a-5eea-4a41-b3c8-144a32c9fa9e1590039953366-roadster.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/6cbcbaa1-7625-4426-abf2-ecdd86350f681590039952871-anouk.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/6b31bff2-ad89-48d9-ab34-1df64ee3acd41590039953567-USPA.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/c8c04af9-f276-4c87-865a-a37f8ee12a0a1590039953155-Levis.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/49e0529b-f16e-488e-baea-f3fe7f41f4d31590039953100-Hrx.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/9e51b35a-5eea-4a41-b3c8-144a32c9fa9e1590039953366-roadster.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/6cbcbaa1-7625-4426-abf2-ecdd86350f681590039952871-anouk.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>
        <div className="main_car">
            <div className="carousels1">
                <img src="https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/5/21/6b31bff2-ad89-48d9-ab34-1df64ee3acd41590039953567-USPA.jpg"/>
            </div>
            <div className="text_car">
            </div>
        </div>       
      </Carousel>
    )
}