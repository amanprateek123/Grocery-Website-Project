import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState} from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


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
    name: "Aashirvaad Atta - Whole Wheat",
    image:"https://www.bigbasket.com/media/uploads/p/l/126906_6-aashirvaad-atta-whole-wheat.jpg",
    json:[
        {
            key:"Size & Fit",
            value:"The model (height 6') is wearing a size M" 
          },
          {
              key:"Material & Care",
              value:"100% cotton"
          },
          {
              key:"Specification",
              value:[
                  {key:"Fabric",
                  value:"Cotton"
              },
                  {
                  key:"Fit",
                  value:"Regular Fit"
                  },
                 {
                  key:"Length",
                  value:"Regular"
                },
               {
                  key:"Main Trend",
                  value:"Colourblocked"
               },
                 {
                  key:"Multipack Set",
                  value:"Single"
                  },
                {
                  key:"Neck",
                  value:"Round Neck"
               },
              {
                  key:"Ocassion",
                  value:"Casual"
              },
              {      
                  key:"Pattern",
                  value:"Color Blocked"
              }
                              ]
              }, 
              {
                key:"About",
                value:"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits. This also means more fluffy and soft rotis at home.",
            },
                {    key:"Ingredients",
                    value:"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body.",
        },  {  
             key:"Nutritional facts",
             value:"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain. If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."
         } 
    ],
    category: {
        id: 1,
        name: 'Aashirvaad'
    },
    description: "Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits.",
    skus: [
        {
            id: 0,
            type: 'variant',
            name: 'Aashirvaad Atta - Whole Wheat, 10 kg Pouch',
            size:'10',
            price: 350,
            json:[
                {
                key:"About",
                value:"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits. This also means more fluffy and soft rotis at home.",
            },
                {    key:"Ingredients",
                    value:"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body.",
        },  {  
             key:"Nutritional facts",
             value:"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain. If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."
         } ],
            images: [
                {
                    id: 1,
                    image: "https://www.bigbasket.com/media/uploads/p/l/126906_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:2,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-2_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:3,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-3_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:4,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-4_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:5,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-5_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:6,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-6_5-aashirvaad-atta-whole-wheat.jpg"
                }
                
            ]
        },
        {
            id: 1,
            type: 'variant',
            name: 'Aashirvaad Atta - Whole Wheat, 5 kg Pouch',
            size:'5',
            price: 180,
            json:[
                
                {
                key:"About",
                value:"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits. This also means more fluffy and soft rotis at home.",
            },
                {    key:"Ingredients",
                    value:"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body.",
        },  {  
             key:"Nutritional facts",
             value:"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain. If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."
         } ],
            images: [
                {
                    id: 1,
                    image: "https://www.bigbasket.com/media/uploads/p/l/126903_7-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:2,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-2_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:3,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126903-3_1-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:4,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-4_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:5,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-5_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:6,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-6_5-aashirvaad-atta-whole-wheat.jpg"
                }
            ]
        },
        {
            id: 2,
            type: 'variant',
            name: 'Aashirvaad Atta - Whole Wheat, 1 kg Pouch',
            size:'1',
            price: 57,
            json:[
                {
                key:"About",
                value:"Aashirvaad whole wheat atta is made of zero per cent maida and 100% atta, which makes it extremely nutritious since its packed with health benefits. This also means more fluffy and soft rotis at home.",
            },
                {    key:"Ingredients",
                    value:"Apart from whole grain, this product contains important vitamins, minerals and calcium, all of which are good for a healthy body.",
        },  {  
             key:"Nutritional facts",
             value:"Whole wheat atta is comparatively healthier than bleached white flour, which is obtained after processing and 60% extraction from grain. If you are consuming whole wheat atta, you are eating food enriched with vitamin B1, B3, B2, folic acid, calcium, phosphorus, iron, fiber and zinc."
         } ],
            images: [
                {
                    id: 1,
                    image: "https://www.bigbasket.com/media/uploads/p/l/30006887_5-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:2,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-2_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:3,
                    image:"https://www.bigbasket.com/media/uploads/p/l/30006887-3_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:4,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-4_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:5,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-5_6-aashirvaad-atta-whole-wheat.jpg"
                },
                {
                    id:6,
                    image:"https://www.bigbasket.com/media/uploads/p/l/126906-6_5-aashirvaad-atta-whole-wheat.jpg"
                }
            ]
        }
    ]
}

const Details = (props) => {

    
    const [quantity,setQuantity]= useState(1)
    const changeQuantity = (event)=>{
        setQuantity(event.target.value)
    }

    const [size,setSize]= useState("10")
    const handleChange = (event) => {
    setSize(event.target.value);
  };

    const [pack,setPack]=useState("0")

   const changePack = (id)=>{
           setPack(id)
    }

    const[img,setImg]=useState(0)
    const changeImg=(i)=>{
          setImg(i)
    }
    
    

    return (
     <div style={{backgroundColor:"#f3f3f3",width:"100%"}}>
          <div className="container"  style={{backgroundColor:"white",paddingTop:'2%'}}>
              <div className="row">
                  <div className="colu">
                      <Paper className="paper" style={{boxShadow:'none'}}>                       
                          <div className="main_img">
                          <Zoom>
                          <img src={sample_product.skus[pack].images[img].image} className="img12" alt="pic"/>
                          </Zoom>
                          </div>                          
                          <div className="slide_image">
                             {
                                 sample_product.skus[pack].images.map((item,i)=>{
                                 return  ( <div className={img===i?"img_det2":"img_det1"} key={item.id} onClick={()=>{changeImg(i)}} >
                                               <img src={item.image} alt="pic"/>
                                            </div>)
                                 })
                             }
                          </div>
                      </Paper>
                  </div>
                  <div className="colu">
                      <Paper>
                          <Detail product={sample_product} size={size} quantity={quantity} pack={pack} handle={changePack} 
                                  id={sample_product.skus.id} handleChange={handleChange} handler={changeQuantity} json={sample_product.json}/>
                      </Paper>
                  </div>
              </div>
              <div>
                 <About head={sample_product.name} about={sample_product.skus[pack].json} json={sample_product.json}/>
              </div>
        </div>
        
     </div>
    );
}

export default Details;