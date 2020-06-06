import React from  'react';
import {Paper,Button} from '@material-ui/core'

 const AdminContent = (props) =>{
    return(
        <Paper style={{height:'600px'}}>
            <h1 style={{textAlign:'center',fotSize:'20px'}}><i>{props.content}</i></h1>
            <div style={{margin:'auto',width:'80%',paddingTop:"5%",paddingBottom:'10px'}} >
            <h6>Please select excel file for uploading {props.content}</h6>
            </div>
            <div style={{display:'flex',flexDirection:"column",margin:'auto',width:'80%'}}>
            <input type="file" accept=".csv" style={{width:'75%',color:"grey",fontSize:'17px'}}/ >
            <Button color="primary" variant="contained" style={{width:'17%',marginTop:'3%'}}>Upload</Button>
            </div>            
        </Paper>
    )
}
export default AdminContent;