import React from 'react'
import { Card, Paper, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import './Home.scss'
import Carousel from './MultiCarousel/Carousel'
import Carousel1 from './MultiCarousel/Carousel1'
import Facilities from './Facilities/Facilities'

export default function Home() {
    return (
        <React.Fragment>
            <Paper className="row home1" style={{margin:'40px auto'}}>
                <Card className="col-md-3">
                    <h1>Customer's Most Loved</h1>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg"  style={{width:'100%'}}/>
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg"  style={{width:'100%'}} />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                      </div>
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                       </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                <h1>Deal of the day</h1>
                <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg"  style={{width:'100%'}}/>
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg"  style={{width:'100%'}} />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                      </div>
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                       </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                <h1>Home Kitchen Essentials</h1>
                <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg"  style={{width:'100%'}}/>
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg"  style={{width:'100%'}} />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                      </div>
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                       </div>
                    </div>
                </Card>
                <Card className="col-md-3">
                <h1>New Products in Stock</h1>
                <div className="row mb-3">
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Atta_Flour_DT_2_275x184_25thJune.jpg"  style={{width:'100%'}}/>
                        </div>
                        <div className="col-md-6">
                            <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_Rice-Rice-Products_DT_4_275x184_25thJune.jpg"  style={{width:'100%'}} />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_SaltSugarJagary_DT_3_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                      </div>
                      <div className="col-md-6">
                             <img src="https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/4ec5c320-719c-4c16-bbb4-5dc4be672239/ec0609fe-11dd-41b1-85e0-8c7a05fdebbf/T1_All_DryFruits_DT_5_275x184_11thJuly.jpg"  style={{width:'100%'}}/>
                       </div>
                    </div>
                </Card>
            </Paper>
            <Paper className="row" style={{margin:'40px auto'}}>
                <Card className="col-md-4">
                    <img src="https://storiesflistgv2.azureedge.net/stories/2016/09/daily_offers_banner_Final.jpg" style={{width:'100%',padding:'5px'}}/>
                </Card>
                <Card className="col-md-4">
                   <img src="https://st1.bgr.in/wp-content/uploads/2019/06/flipkart-bonanza.jpg" style={{width:'100%',padding:'5px'}}/>
                </Card>
                <Card className="col-md-4">
                   <img src="https://storiesflistgv2.azureedge.net/stories/2016/09/daily_offers_banner_Final.jpg" style={{width:'100%',padding:'5px'}}/>
                </Card>
            </Paper>
            <Paper className="multi_car" style={{margin:'40px auto'}}> 
                 <div style={{borderBottom:'2px solid #f3f3f3'}}>
                 <h1>Best Battery Phones</h1>
                 <p>More than 4000 mAh battery</p>
                 </div>
                <div className="mt-1">
                <Carousel/>
                </div>
            </Paper>
            <Paper className="multi_car" style={{margin:'40px auto'}}> 
                 <div style={{borderBottom:'2px solid #f3f3f3'}}>
                 <h1>Trending Brands</h1>
                 </div>
                <div className="mt-1">
                <Carousel1/>
                </div>
            </Paper>
            <Paper style={{margin:'40px auto',height:'250px'}}>
                <div className="mt-1">
                <Facilities/>
                </div>
            </Paper>
        </React.Fragment>
    )
}
