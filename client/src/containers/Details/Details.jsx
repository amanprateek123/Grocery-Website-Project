import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import Zoom from './Zoom_box'
import 'react-medium-image-zoom/dist/styles.css'
import Modal from '../../components/Modal/Modal';


import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
}
    from '@material-ui/core'

import Detail from '../../components/Details/Details'
import About from '../../components/Details/About'

import './Details.scss'


let sample_product = {
    id: 20,
    name: "Xiaomi Redmi Note 5 Pro",
    brand: "xiaomi",
    description: "Take photos, make calls or watch videos easily on this Redmi Note 5 Pro mobile phone. Powered by Qualcomm Snapdragon 636 Octa-core Processor, this mobile will provide a lag-free performance even when you’re multitasking. And, the 4000 mAh battery will ensure longer hours of entertainment without any interruption.",
    keywords: null,
    json: null,
    createdAt: "2020-06-08T12:08:44.000Z",
    updatedAt: "2020-06-08T12:08:44.000Z",
    categoryId: 2,
    category: {
        id: 2,
        name: "Smart Phones"
    },
    skus: [
        {
            id: 1,
            code: "1",
            type: "variant",
            name: "4gb - 64gb",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, deleniti!",
            price: 100,
            stockQuantity: 5,
            json: `[{"key":"About","value":"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits.This also means more fluffy and soft rotis at home."},{"key":"Ingredients","value":"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body."},{"key":"Nutritional facts","value":"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain.If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."}]`,
            createdAt: "2020-06-08T12:08:44.000Z",
            updatedAt: "2020-06-08T12:08:44.000Z",
            productId: 20,
            images: [
                {
                    id: 1,
                    src: "https://assets.gadgets360cdn.com/shop/assets/products/redmi-note-5-pro-4-gb-ram-64-gb_1519626803.jpeg"
                },
                {
                    id: 7,
                    src: "https://picsum.photos/200/200"
                }
            ]
        },
        {
            id: 2,
            code: "2",
            type: "variant",
            name: "6gb -64gb",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, deleniti!",
            price: 200,
            stockQuantity: 10,
            json: `[{"key":"About","value":"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits.This also means more fluffy and soft rotis at home."},{"key":"Ingredients","value":"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body."},{"key":"Nutritional facts","value":"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain.If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."}]`,
            createdAt: "2020-06-08T12:08:44.000Z",
            updatedAt: "2020-06-08T12:08:44.000Z",
            productId: 20,
            images: [
                {
                    id: 2,
                    src: "https://global.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1518342456.70319411.jpg"
                }
            ]
        },
        {
            id: 3,
            code: "3",
            type: "variant",
            name: "6gb - 128gb",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, deleniti!",
            price: 300,
            stockQuantity: 6,
            json: `[{"key":"About","value":"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits.This also means more fluffy and soft rotis at home."},{"key":"Ingredients","value":"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body."},{"key":"Nutritional facts","value":"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain.If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."}]`,
            createdAt: "2020-06-08T12:08:44.000Z",
            updatedAt: "2020-06-08T12:08:44.000Z",
            productId: 20,
            images: [
                {
                    id: 3,
                    src: "https://assets.gadgets360cdn.com/shop/assets/products/redmi-note-5-pro-4-gb-ram-64-gb_1519626803.jpeg"
                }
            ]
        }
    ]
};



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

    const [product, setProduct] = useState(sample_product);
    useEffect(() => {
        fetch(`/get-products?id=${props.match.params.id}`).then(res => res.json().then(({ products: [product] }) => {
            setProduct(product)
        })).catch(err => {
            console.log(err);

        })

    }, [])


    return (
        <React.Fragment>
            <Modal visible={props.authModalVisible}>
              <Zoom closeModal={props.closeModal} product={product} pack={pack} changeImg={changeImg} img={img}/>
            </Modal>
        <div style={{ backgroundColor: "#f3f3f3", width: "100%" }}>
            <div className="container" style={{ backgroundColor: "white", paddingTop: '2%' }}>
                <div className="row">
                    <div className="colu">
                        <Paper>

                            <div className="main_img" onClick={props.openModal}>
                                    <img src={product.skus[pack].images[img].src} alt="pic" />                                
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
                    <div className="colu">
                        <Paper>
                            <Detail product={product} size={size} quantity={quantity} pack={pack} handle={changePack}
                                id={product.skus.id} handleChange={handleChange} handler={changeQuantity} />
                        </Paper>
                    </div>
                </div>
                <div>
                    {product.skus[pack].json ? <About head={product.name} json={product.skus[pack].json} /> : null}
                </div>
            </div>

        </div>
        </React.Fragment>
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