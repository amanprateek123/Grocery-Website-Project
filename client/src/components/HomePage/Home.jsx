import React from 'react'
import { Card, Paper, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import './Home.scss'
import Carousel from './MultiCarousel/Carousel'
import Carousel1 from './MultiCarousel/Carousel1'
import Facilities from './Facilities/Facilities'
import { useQuery, useMutation } from 'react-query';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product'

export default function Home() {
    //fetch homepage table using query
    const [productQueries, setProductQueries] = useState([]); // product list related Queries Meta
    const [imageQueries, setImageQueries] = useState([]); // Images related queries.
    const [specialQueries, setSpecialQueries] = useState([]); // 4x4 section queries.


    const [productSections, setProductSections] = useState([]); // Product Sections Data 

    useEffect(() => {
        fetch('admin/homepage', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(res => res.json())
            .then(sections => {
                setProductQueries(sections.filter(sec => sec.fieldType == 'Adding Product'))
                setImageQueries(sections.filter(sec => sec.fieldType == 'Adding Banners'))
                setSpecialQueries(sections.filter(sec => sec.fieldType == 'special'))
                console.log(productQueries, imageQueries, specialQueries);
            })
    }, [])

    useEffect(() => {
        console.log('fetching Products.');
        let _productSections = [];
        Promise.all(
            productQueries.map(pq => (
                fetch(`/get-products?ids=${pq.value}`).then(async res => {
                    let data = await res.json();
                    console.log(data);
                    _productSections.push({ ...data, query: pq })
                })
            ))
        ).then(queries => {
            setProductSections(_productSections)
            console.log('Sections state set.');
        })
    }, [productQueries])

    return (
        <React.Fragment>

            {/* THIS IS SAMPLE */}

            <Paper>
                {
                    productSections.map(ps => (
                        <Card className="row">
                            <div className="col">
                                <h4>{ps.query.key}</h4>
                                <h6 className="text-muted">{ps.query.subHeading}</h6>
                                <div className="row">
                                    {
                                        ps.products.map(p => (
                                            <Product product={p} />
                                        ))
                                    }
                                </div>
                            </div>
                        </Card>
                    ))
                }
            </Paper>

            {/* SAMPLE ENDS */}

            <Paper Paper className="row home1" style={{ margin: '40px auto' }}>
                <Card className="col-md-3">
                    <h1>Customer's Most Loved</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                    <h1>Deal of the day</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                    <h1>Home Kitchen Essentials</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                    <h1>New Products in Stock</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg" style={{ width: '100%' }} />
                        </div>
                    </div>
                </Card>
            </Paper>
            <Paper className="row" style={{ margin: '40px auto' }}>
                <Card className="col-md-4">
                    <img src="https://storiesflistgv2.azureedge.net/stories/2016/09/daily_offers_banner_Final.jpg" style={{ width: '100%', padding: '5px' }} />
                </Card>
                <Card className="col-md-4">
                    <img src="https://st1.bgr.in/wp-content/uploads/2019/06/flipkart-bonanza.jpg" style={{ width: '100%', padding: '5px' }} />
                </Card>
                <Card className="col-md-4">
                    <img src="https://storiesflistgv2.azureedge.net/stories/2016/09/daily_offers_banner_Final.jpg" style={{ width: '100%', padding: '5px' }} />
                </Card>
            </Paper>
            <Paper className="multi_car" style={{ margin: '40px auto' }}>
                <div style={{ borderBottom: '2px solid #f3f3f3' }}>
                    <h1>Best Battery Phones</h1>
                    <p>More than 4000 mAh battery</p>
                </div>
                <div className="mt-1">
                    <Carousel />
                </div>
            </Paper>
            <Paper className="multi_car" style={{ margin: '40px auto' }}>
                <div style={{ borderBottom: '2px solid #f3f3f3' }}>
                    <h1>Trending Brands</h1>
                </div>
                <div className="mt-1">
                    <Carousel1 />
                </div>
            </Paper>
            <Paper style={{ margin: '40px auto', height: '250px' }}>
                <div className="mt-1">
                    <Facilities />
                </div>
            </Paper>
        </React.Fragment>
    )
}
