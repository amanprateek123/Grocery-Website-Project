import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Dashboard.scss'
import { useEffect } from 'react';

import Orders from './Orders/Orders'
import OrderedItems from './OrderedItems/OrderedItems'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box px={3} >
                    {children}
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function Dashboard() {
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='admin-dashboard'>
            <Tabs
                orientation="vertical"
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className='tabs'
            >
                <Tab label="Orders" {...a11yProps(0)} />
                <Tab label="Ordered Items" {...a11yProps(1)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <Orders />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <OrderedItems />
            </TabPanel>

        </div>
    );
}

export default Dashboard;