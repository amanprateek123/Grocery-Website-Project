import React from 'react'
import './Zoom_box.scss'
import CloseIcon from '@material-ui/icons/Close';

export default function Zoom_box(props) {
    return (
        <div className="zoom">
            <div className="cross">
               <CloseIcon onClick={props.closeModal}/>
            </div>
            <div className="slide_zoom">
            {props.product.skus[props.pack].images.map((item, i) => {
                    return (<div className={props.img === i ? "img_det2" : "img_det1"} key={item.id} onClick={() => { props.changeImg(i) }} >
                               <img src={item.src} alt="pic" />
                            </div>)
                                    })
                                }
            </div>
            <div className="main_zoom">
                <div style={{transform:'translate3d()0px,0px,0px',transition:'transform 0.2s linear 0s'}}>
                 <div className="img_z">
                    <img src={props.product.skus[props.pack].images[props.img].src} alt="pic" />
                </div>                   
                </div>
            </div>
        </div>
    )
}
