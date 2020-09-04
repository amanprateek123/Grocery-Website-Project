import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import Zoom from './Zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Modal from '../../components/Modal/Modal';


import {
    Paper, LinearProgress

}
    from '@material-ui/core'

import Detail from '../../components/Details/Details'
import About from '../../components/Details/About'

import './Details.scss'
import SimilarProducts from '../../components/Details/SimilarProducts';


const Details = (props) => {


    const [quantity, setQuantity] = useState(1)
    const changeQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const [size, setSize] = useState("10")
    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const [pack, setPack] = useState("0")

    const changePack = (id) => {
        setPack(id)
    }
    const [img, setImg] = useState(0)
    const changeImg = (i) => {
        setImg(i)
    }

    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch(`/get-products?id=${props.match.params.id}`).then(res => res.json().then(({ products: [product] }) => {
            setProduct(product);
            if (props.location.search) {
                let skuId = new URLSearchParams(props.location.search).get('skuId');
                let index = 0;
                product.skus.forEach((s, i) => {
                    if (s.id == skuId)
                        index = i
                })
                setPack(parseInt(index))

            }
            window.scrollTo(0, 0);
        })).catch(err => {
            console.log(err);

        })


    }, [props.location])

    const [zoom, setZoom] = useState(false);


    return (
        product ?
            <React.Fragment>
                <Modal visible={zoom}>
                    <Zoom closeModal={() => setZoom(false)} product={product} pack={pack} changeImg={changeImg} img={img} />
                </Modal>
                <div className="container detail-page" style={{ backgroundColor: "#eef9", padding: '2em 2em', marginTop: "0em", borderRadius: "1em" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <Paper className="image-col">

                                <div className="main_img" >
                                    {product.skus[pack].images[img] ? <img src={product.skus[pack].images[img].src} alt="pic" onClick={() => setZoom(true)} /> : null}
                                </div>
                                <div className="slide_image">
                                    {
                                        product.skus[pack].images.map((item, i) => {
                                            return (<div className={img === i ? "img_det2" : "img_det1"} key={item.id} onClick={() => { changeImg(i) }} >
                                                <img src={item.src} alt="pic" />
                                            </div>)
                                        })
                                    }
                                </div>
                            </Paper>
                        </div>
                        <div className="col-md-6">
                            <Paper className="detail-col">
                                <Detail product={product} size={size} quantity={quantity} pack={pack} handle={changePack}
                                    id={product.skus.id} handleChange={handleChange} handler={changeQuantity} />
                            </Paper>
                        </div>
                    </div>
                    <div>
                        {product.skus[pack].json ? <About head={product.name} json={product.skus[pack].json} /> : null}
                    </div>
                    <div>
                        <SimilarProducts category={product.category.name} currentId={product.id} />
                    </div>
                </div>
            </React.Fragment >
            : <div className="row mt-4"><LinearProgress /></div>
    );
}
const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch({ type: actions.CLOSE_AUTH_MODAL }),
        openModal: () => dispatch({ type: actions.OPEN_AUTH_MODAL }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);