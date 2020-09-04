import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import './Carousel.scss'
import { Link } from "react-router-dom";
export default function Carousels(props){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 10
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 8
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      console.log(props.product)

      const trimming = (string) => {
        const length = 25
        var trimmedString = string.length > length ?
            string.substring(0, length) + "..." :
            string;
        return trimmedString
    }
    return(
       props.product? <Carousel 
        responsive={responsive}        
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        >
        {props.product.map((item,i)=>(
          <Link to={`/product/${item.id}`} style={{textDecoration:'none'}} key={item.id+i} >
        <div className="main_car">
        <div className="carousels">
            <img src={item.skus[0].images[0].src}/>
        </div>
        <div className="text_car">
            <h5> {trimming(item.name)} </h5>
            {item.name.length>25?
            <h4> {item.name} </h4>:null}
            <h6 style={{color:'black'}}>{item.category.name}</h6>
            <p>Now ₹{item.skus[0].price}</p>
        </div>
    </div>           
          </Link>           
        ))}
        {/* <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/k2jbyq80pkrrdj/mobile-refurbished/a/j/j/a5s-32-b-cph1909-oppo-2-original-imaffmvugunustek.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/k3xcdjk0pkrrdj/mobile/r/f/j/vivo-y19-vivo-1915-pd1934f-ex-original-imafmcpdt4hfhq6f.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/jxz0brk0/mobile/7/b/a/redmi-k20-na-original-imafgb4xesjtrzuu.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/k51cpe80pkrrdj/mobile/e/g/k/vivo-u10-vivo-1916-pd1928cf-in-original-imafndgchgkpgetk.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/jxz0brk0/mobile/m/6/z/redmi-k20-pro-na-original-imafgb4yzvmbfewa.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/200/200/k51cpe80pkrrdj/mobile/g/d/t/oppo-a9-2020-cph1937-original-imafmhwbgre6pujw.jpeg?q=90"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/312/312/kb1470w0/mobile/q/g/g/oppo-a12-cph2083-original-imafsh2hfkyamqyt.jpeg?q=70"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/200/200/k0bbb0w0/mobile/x/f/q/oneplus-7-gm1901-original-imafk4ywxhrqddvg.jpeg?q=90"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/200/200/k4rcmfk0pkrrdj/mobile-refurbished/t/t/x/redmi-a3-128-u-mzb7978in-mi-6-original-imafny2n2qygagz5.jpeg?q=90"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div>
        <div className="main_car">
            <div className="carousels">
                <img src="https://rukminim1.flixcart.com/image/200/200/kc3p30w0/mobile/f/w/u/realme-6-rmx2001-original-imaftazphzthcbse.jpeg?q=90"/>
            </div>
            <div className="text_car">
                <h5>Oppo A12 (Blue, 32 GB)</h5>
                <h6>5000 mAh Battery</h6>
                <p>Now ₹8999</p>
            </div>
        </div> */}
        
      </Carousel>:null
    )
}