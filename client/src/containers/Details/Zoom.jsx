import React from 'react'
import './Zoom.scss'
import CloseIcon from '@material-ui/icons/Close';

export default function Zoom(props) {
    return (
        <div className='zoom1'>
            <div className="zoom_img1">
               <img src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/2477343/2018/2/22/11519301743689-Libas-Women-Green-Woven-Design-Pathani-Kurta-4531519301743438-1.jpg" />
            </div>
            <div className="slide_zoom1">
             {props.product.skus[props.pack].images.map((item, i) => {
                    return (<div className={props.img === i ? "img_det2a" : "img_det1a"} key={item.id} onClick={() => { props.changeImg(i) }} >
                               <img src={item.src} alt="pic" />
                            </div>)
                                    })
                                }
            </div>
            <div className="close" onClick={props.closeModal}>
               <CloseIcon/>
            </div>
        </div>
    )
}
