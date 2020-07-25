import React, { useState, useEffect } from 'react'
import './Zoom.scss'
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Zooming from 'zooming'
import { useRef } from 'react';

export default function Zoom(props) {

    const [next, setnext] = useState(props.img)
    const [zoomed, setZoomed] = useState(false)
    const left_move = () => {
        if (next > 0) {
            let index = next - 1;
            setnext(index)
        }
    }
    const right_move = () => {
        if (next < (props.product.skus[props.pack].images.length - 1)) {
            let index = next + 1;
            setnext(index)
        }
    }
    const changeImg = (i) => {
        setnext(i)
    }

    let img = useRef();

    useEffect(() => {
        const zooming = new Zooming({
            // options...
            bgColor: "#000",
            onBeforeOpen: () => {
                setZoomed(true)
            },
            onClose: () => {
                setZoomed(false)
            }
        })

        zooming.listen('.zooming')
        console.log(img.current)
    }, [])

    return (
        <div className='zoom_1'>
            <div className="zoom_img1">
                <img className="zooming"   className="animate__animated animate__slideInRight" src={props.product.skus[props.pack].images[next].src} />
            </div>
            <div className="slide_zoom1">
                {props.product.skus[props.pack].images.map((item, i) => {
                    return (<div className={(next) === i ? "img_det2a" : "img_det1a"} key={item.id} onClick={() => { changeImg(i) }} >
                        <img src={item.src} alt="pic" />
                    </div>)
                })
                }
            </div>
            {
                !zoomed ?
                    <React.Fragment>
                        <div className="close" onClick={props.closeModal}>
                            <CloseIcon />
                        </div>
                        <div>
                            <button className="btn_left" onClick={left_move}>
                                <ChevronRightIcon style={{ transform: 'rotate(180deg' }} />
                            </button>
                            <button className="btn_right" onClick={right_move}>
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </React.Fragment>
                    : null
            }

        </div>
    )
}