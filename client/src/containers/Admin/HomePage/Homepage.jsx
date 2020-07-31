import React from 'react';
import { Paper, Button, TextField, Select, MenuItem, FormHelperText } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import '../Admin.scss'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { Formik, Form, Field,ErrorMessage,FieldArray } from 'formik';
import './Homepage.scss'
import { useMutation } from 'react-query';
import Snackbar from '@material-ui/core/Snackbar';

 function Homepage(props) {
    
    const initial = {
        sections:[
            {
                key:'',
                value:'',
                fieldType:''
            }
        ]
    }
    const [data,setData] = useState(null)

    const homePage = (variable) =>{
        return (
            fetch('/admin/homepage',{
                headers: {
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify(variable.variables.sections)
            }).then(res=>res.json()).then(res=>{
                  console.log(res)
                  setData(res)
                  setSnackbar(true)
            })
        )
    }
    const[snackbar,setSnackbar] = useState(false)

    const [home,meta] = useMutation(homePage)


    return (
        <Paper className="home_edit">
            <h1>Homepage</h1>
            <div className="m-3">
                <p className="p-2" style={{fontSize:'20px'}}>Add sections for the Homepage:</p>
                 <div>  
                    <Formik
                    initialValues={initial}
                    onSubmit={async (values,{setSubmitting})=> await home({variables:values})}
                    >
                    {({values}) =>(
                         <div>   
                        <Form className="home_form" style={{fontSize:"17px",marginTop:'4%'}}> 
                        <FieldArray name="sections">
                        {({ insert, remove, push })=>(
                           <React.Fragment>
                                <div>
                            {values.sections.map((sec, index)=>(
                                <div key={index}>
                                   <div className="mt-3">
                  <label htmlFor={`sections.${index}.fieldType`}>Enter the Field Type:</label>
                  <Field name={`sections.${index}.fieldType`} as="select" style={{float:'right',padding:'3px',width:'300px'}}>
                   <option value="">Select Option</option>   
                   <option value="Adding Product">Adding Product</option>
                   <option value="Adding Banners">Adding Banners</option>
                 </Field>
                  <ErrorMessage name="fieldType" />
                  </div>
                  <div className="mt-3">
                  <label htmlFor={`sections.${index}.key`}>Enter the heading for the section:</label>
                  <Field name={`sections.${index}.key`} type="text" style={{float:'right',padding:'3px',width:'300px'}} required />
                  <ErrorMessage name={`sections.${index}.key`} />
                  </div>
                   {sec.fieldType===''?null:
                                     <div className="mt-3">
                                     <label htmlFor={`sections.${index}.value`}>Enter the {(sec.fieldType==="Adding Product")?"JSON Array(SKU's ID) for adding products":(sec.fieldType)==="Adding Banners"?"array of image links":null}:</label>
                                     <Field name={`sections.${index}.value`} type="text" style={{float:'right',padding:'3px',width:'300px'}} required/>
                                     <ErrorMessage name={`sections.${index}.value`} />
                                     </div>}

                   <Button color="secondary" onClick={() => remove(index)}>Remove</Button>
                                 </div>
                            ))}
                        </div>
{/*                      
                   {meta.isSuccess?<div style={{color:'green',textAlign:'center',fontSize:'15px'}}>Uploaded Successfully</div>:null} */}
                   {meta.isError?<div style={{color:'red',textAlign:'center',fontSize:'15px'}}>Uploading Failed</div>:null}   
                        <div className="mt-3">                            
                 <Button style={{padding:'5px 4px',borderRadius:'200px',width:'180px',marginBottom:'5px',fontSize:'15px'}} variant="contained" color="secondary" onClick={() => push({ key: "", value: "",fieldType:"" })}>Add Section</Button>
                  <Button type="submit" variant="contained" color="primary" style={{padding:'5px 4px',borderRadius:'200px',width:'180px',margin:'5% 37%',fontSize:'15px'}}>Submit</Button>
                        </div>
                           </React.Fragment>
                        )}
                            
                        </FieldArray>
                      
                </Form>
                         </div>
                    )}
                    </Formik>   
                </div>
            </div>
            <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
         <Alert  severity="success" className="home-snackbar" variant="filled" >
            Uploaded Successfully
          </Alert>
      </Snackbar>
        </Paper>    
    )
}

const mapStateToProps = state => {
    return {
      ...state
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
  
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);