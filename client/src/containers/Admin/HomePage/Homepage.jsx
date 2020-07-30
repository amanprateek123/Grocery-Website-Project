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

export default function Homepage() {
   
    const initial = {
        sections:[
            {
                key:'',
                value:'',
                fieldType:''
            }
        ]
    }
    return (
        <Paper className="home_edit">
            <h1>Homepage</h1>
            <div className="m-3">
                <p className="p-2" style={{fontSize:'20px'}}>Add sections for the Homepage:</p>
                 <div>  
                    <Formik
                    initialValues={initial}
                    onSubmit={(values,{setSubmitting})=>{
                       console.log(values)
                    }}
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
                  <label htmlFor={`sections.${index}.key`}>Enter the heading for the section:</label>
                  <Field name={`sections.${index}.key`} type="text" style={{float:'right',padding:'3px',width:'300px'}} />
                  <ErrorMessage name={`sections.${index}.key`} />
                  </div>
                  <div className="mt-3">
                  <label htmlFor={`sections.${index}.value`}>Enter the JSON Array(SKU's ID) for adding products:</label>
                  <Field name={`sections.${index}.value`} type="text" style={{float:'right',padding:'3px',width:'300px'}}/>
                  <ErrorMessage name={`sections.${index}.value`} />
                  </div>
                  <div className="mt-3">
                  <label htmlFor={`sections.${index}.fieldType`}>Enter the Field Type:</label>
                  <Field name={`sections.${index}.fieldType`} as="select" style={{float:'right',padding:'3px',width:'300px'}}>
                   <option value="product">Adding Product</option>
                   <option value="banners">Adding Banners</option>
                 </Field>
                  <ErrorMessage name="fieldType" />
                  </div>
                   <Button color="secondary" onClick={() => remove(index)}>Remove</Button>
                                 </div>
                            ))}
                        </div>
                        <div className="mt-3">                            
                 <Button style={{padding:'10px 8px',borderRadius:'200px',width:'200px',marginBottom:'5px',fontSize:'17px'}} variant="contained" color="secondary" onClick={() => push({ key: "", value: "",fieldType:"" })}>Add Section</Button>
                  <Button type="submit" variant="contained" color="primary" style={{padding:'10px 8px',borderRadius:'200px',width:'200px',margin:'5% 35%',fontSize:'17px'}}>Submit</Button>
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
        </Paper>    
    )
}
