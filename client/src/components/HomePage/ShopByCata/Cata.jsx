import React,{useState,useEffect} from 'react'
import './Cata.scss'
import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
    , Slider, LinearProgress, Snackbar, InputAdornment,
}
    from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
export default function Cata() {
   const [dept,setDept] = useState(null)

   useEffect(()=>{
    fetch('/get-categories').then(res => {
        res.json().then(departments=>{
            setDept(departments)
        })})
   },[])
   console.log('setdept',dept)

    return (
        dept?<div className="cata">
            <div className="cata_img">
                <img src="https://rukminim1.flixcart.com/flap/1242/249/image/c9c143aaae68a3d9.jpg?q=90" />
            </div>
            <div>
                {dept.map(department=>(
                    <Accordion key={department.id}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}>
                            {department.name}
                        </AccordionSummary>
                        <AccordionDetails className="row">
                            {department?department.parentCategories.map(parent=>(
                                <Accordion key={parent.id} className="col-12">
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}>
                                        {parent.name}
                                    </AccordionSummary>
                                    <AccordionDetails className="row">
                                         {parent?parent.categories.map(cata=>(
                                             <div className="col-6" key={cata.id} style={{textAlign:'center'}} ><Link to={`/products?category=${cata.name}`} style={{textDecoration:'none',textAlign:'center',color:'var(--mainColor'}} >{cata.name}</Link></div>
                                         )):null}
                                    </AccordionDetails>
                                </Accordion>
                            )):null}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>:null
    )
}
