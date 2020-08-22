import React from 'react'
import { Paper,Card, Button, Select, MenuItem, FormHelperText } from '@material-ui/core'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui'
import { useQuery, useMutation } from 'react-query';
import Snackbar from '@material-ui/core/Snackbar';
import './Offers.scss'
import { Alert } from '@material-ui/lab'
import Modal from '../../../components/Modal/Modal'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function Offers() {

    const[data,setData]=useState(null)

    useEffect(() => {
        fetch('/admin/offers', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json()).then(res => {
            console.log('res',res)
            setData(res)
        })
    }, [])

    const delOffer = (variable)=>{
        return(
            fetch('/admin/offers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({offerCode:variable.variables})
            }
                ).then(res => res.json()).then(res => {
                    console.log(res)
                })
        )
    }
    const [del,meta1]=useMutation(delOffer)

    const [snackbar, setSnackbar] = useState(false)

    const offerAdd = (e) => {
        e.preventDefault()
        console.log('arg',offer)
        return (
            fetch('/admin/offers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(offer)
            }).then(res => res.json()).then(res => {
                console.log(res)
                setSnackbar(true)
            })
        )
    }
    const [off, meta] = useMutation(offerAdd)
    
    const format = (data)=>{
        return data.split('.')[0]
    }

    const [code,setCode]=useState('Select Offer')
    
    //Modal
    const [dels,setDels]=useState(false)
    const open = ()=>{
        setDels(true)
    }
    const close = ()=>{
        setDels(false)
    }
   
    const handle = (e)=>{
        setCode(e.target.value)
    }
    let scheme = {offerCode:'',startDate:'',endDate:'',discount:'',minAmt:''}
    const[form,setForm] = useState(false)
    const [offer,setOffer] = useState(scheme)

    const handleOffer = (e)=>{
        setOffer({...offer,[e.target.name]: e.target.value})
    }

    const show = ()=>{
        setForm(true)
        setEdit(false)
        setCode('Select Offer')
        setOffer(scheme)
    }
const cancel = ()=>{
    setForm(false)
}
const [edit,setEdit]=useState(false)

const editForm=()=>{
    setEdit(true)
    setForm(false)  
}

    console.log('offer',code)
    useEffect(()=>{
        if(code==="Select Offer"){
            setOffer(scheme)            
        }
        else{
            if(data){
                let i = data.find(itm=>itm.offerCode===code)
                 let a= {offerCode:i.offerCode,startDate:i.startDate,endDate:i.endDate,discount:i.discount,minAmt:i.minAmt}
                 setOffer(a)
            }
        }
    },[code])

    return (
          <Paper className="offers">
              <Modal visible={dels}>
                   <Card style={{width:'30%',padding:'10px'}}>
                       <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                           <ErrorOutlineIcon fontSize='inherit' style={{color:'var(--mainColor)',fontSize:'65px'}} />
                       </div>
                       <h1>Are you sure?</h1>
                       <div className="option">
                       <p>This offer will be permanently deleted!</p>
                       <Button onClick={()=>del({variables:code})} id="del" color='primary' variant="contained" style={{padding: '5px 4px', width: '100px', margin: '5% 0', fontSize: '15px'}} >Yes</Button><span style={{}}><Button onClick={close} id="del1" color="secondary" variant="contained" style={{float:'right',padding: '5px 4px', width: '100px', margin: '5% 0', fontSize: '15px'}} >No</Button></span>
                       </div>
                   </Card>
              </Modal>
             <h1>Genric Offers</h1>
             <div className="row mt-4" >
                <div className="col-md-6" style={{display:'flex',justifyContent:'center'}}>
                   <Button color="secondary" variant="contained" style={{padding:'10px'}} onClick={show} >Add new Offer</Button>
                </div>
                <div className="col-md-6" style={{display:'flex',justifyContent:'center'}}> 
                   <Button color="primary" variant="contained" style={{padding:'10px 15px'}} onClick={editForm} >Edit Offers</Button>
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                {edit?
                <select style={{width:'30%',padding:'3px'}} onChange={handle}>
                    <option>Select Offer</option>
                {data?data.map(itm=>(
                    <option key={itm.offerCode+itm.discount}>{itm.offerCode}</option>
                )):null}
            </select>:null}
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                {(form || (edit && code!='Select Offer'))?(
                   <form style={{width:'50%'}} onSubmit={off} >
                       <div className="mt-3" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <label htmlFor='offerCode'>Enter the Offer Code:</label>
                        <input name='offerCode' id='offerCode' value={offer.offerCode} type="text" style={{ padding: '3px' }} required onChange={handleOffer} disabled={edit} />
                    </div>
                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <label htmlFor='startDate'>Enter the Starting Date & Time:</label>
                        <input name='startDate' id='startDate' type="datetime-local" value={format(offer.startDate)}  style={{ padding: '3px' }} required onChange={handleOffer} />                            
                    </div>
                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <label htmlFor='endDate'>Enter the Ending Date & Time:</label>
                        <input name='endDate' id='endDate' type="datetime-local" style={{ padding: '3px' }} value={format(offer.endDate)} required onChange={handleOffer} />                                                  </div>
                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <label htmlFor='discount'>Enter the amount of discount(in %)</label>
                        <input name='discount' id='discount' type="text" style={{ padding: '3px' }} value={offer.discount} required onChange={handleOffer} />                                                    </div>
                    <div className="mt-3 mb-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <label htmlFor='minAmt'>Enter the min. order amount:</label>
                        <input name='minAmt' id='minAmt' type="text" style={{ padding: '3px' }} value={offer.minAmt} required onChange={handleOffer} />  
                    </div>
                    <Button type="submit" variant="contained" color="primary" style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', margin: '5% 0', fontSize: '15px' }}>Submit</Button>
                    <span>
                    {!edit?<Button variant="contained" color="secondary" style={{ padding: '5px 4px',float:'right', borderRadius: '200px', width: '180px', margin: '5% 0', fontSize: '15px' }} onClick={cancel} >Cancel</Button>
                    :<Button  variant="contained" color="secondary" style={{ padding: '5px 4px',float:'right', borderRadius: '200px', width: '180px', margin: '5% 0', fontSize: '15px' }} onClick={open} >Delete</Button>}</span>
                   </form>
                ):null}
                <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="success" className="home-snackbar" variant="filled" >
                Uploaded Successfully
      </Alert>
        </Snackbar>
            </div>
             </div>


             {/* <div>
                       <select  name='option' onChange={handle}>
                        <option value="new" >New Offer</option>
                          {data?data.map(itm=>(
                          <option key={itm.offerCode} value={itm.offerCode}  >{itm.offerCode}</option>
                          )):null}
                              </select>
                          </div>
             <div>
               <Formik
                 initialValues={initial}
                 onSubmit={async (values, { setSubmitting }) => {
                                await off({variables:values})
                                 }}
                 >
                  {({values})=>(   
            <Form className="home_form" style={{ fontSize: "17px", marginTop: '2%' }}>
            <div style={{ margin: '1em 0', padding: '1em', background: '#eee7' }}>
                      <React.Fragment>
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <label htmlFor='offerCode'>Enter the Offer Code:</label>
                            <Field name='offerCode' id='offerCode' component={TextField}  type="text" style={{ padding: '3px' }} required />
                            <ErrorMessage name='offerCode' />
                        </div>
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <label htmlFor='startDate'>Enter the Starting Date & Time:</label>
                            <Field name='startDate' id='startDate' component={TextField} type="datetime-local"  style={{ padding: '3px' }} required />
                            <ErrorMessage name='startDate' />
                        </div>
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <label htmlFor='endDate'>Enter the Ending Date & Time:</label>
                            <Field name='endDate' id='endDate' component={TextField} type="datetime-local" style={{ padding: '3px' }} required />
                            <ErrorMessage name='endDate'/>
                        </div>
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <label htmlFor='discount'>Enter the amount of discount(in %)</label>
                            <Field name='discount' id='discount' component={TextField} type="text" style={{ padding: '3px' }} required />
                            <ErrorMessage name='discount' />
                        </div>
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <label htmlFor='minAmt'>Enter the min. order amount:</label>
                            <Field name='minAmt' id='minAmt' component={TextField} type="text" style={{ padding: '3px' }} required />
                            <ErrorMessage name='minAmt' />
                        </div>
                    </React.Fragment>
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', margin: '5% 37%', fontSize: '15px' }}>Submit</Button>
            </Form>
                  )}

                 </Formik>
             </div>
             <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" className="home-snackbar" variant="filled" >
                    Uploaded Successfully
          </Alert>
            </Snackbar> */}
          </Paper>
           















        // <Paper className="offers">
        //     <h1>Genric Offers</h1>
        //     <div className="offer_head">
        //         <p>Add Offers for your customer :</p>
        //         <div>
        //             {initial ? <Formik
        //                 initialValues={initial}
        //                 onSubmit={async (values, { setSubmitting }) => {
        //                     await off({variables:values})
        //                     console.log(values)
        //                 }}
        //             >
        //                 {({ values }) => (
        //                     <div>
        //                         <Form className="home_form" style={{ fontSize: "17px", marginTop: '2%' }}>
        //                             <FieldArray name="offers">
        //                                 {({ insert, remove, push }) => (
        //                                     <React.Fragment >
        //                                         <div>
        //                                             {values.offers.map((offer, index) => (
        //                                                 <div key={index} style={{ margin: '1em 0', padding: '1em', background: '#eee7' }}>
        //                                                         <React.Fragment>
        //                                                             <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        //                                                                 <label htmlFor={`offers.${index}.offerCode`}>Enter the Offer Code:</label>
        //                                                                 <Field name={`offers.${index}.offerCode`} component={TextField} type="text" style={{ padding: '3px' }} required />
        //                                                                 <ErrorMessage name={`offers.${index}.offerCode`} />
        //                                                             </div>
        //                                                             <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        //                                                                 <label htmlFor={`offers.${index}.startDate`}>Enter the Starting Date & Time:</label>
        //                                                                 <Field name={`offers.${index}.startDate`} value={format(offer.startDate)} component={TextField} type="datetime-local" style={{ padding: '3px' }} required />
        //                                                                 <ErrorMessage name={`offers.${index}.startDate`} />
        //                                                             </div>
        //                                                             <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        //                                                                 <label htmlFor={`offers.${index}.endDate`}>Enter the Ending Date & Time:</label>
        //                                                                 <Field name={`offers.${index}.endDate`} component={TextField} type="datetime-local" value={format(offer.endDate)}  style={{ padding: '3px' }} required />
        //                                                                 <ErrorMessage name={`offers.${index}.endDate`} />
        //                                                             </div>
        //                                                             <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        //                                                                 <label htmlFor={`offers.${index}.discount`}>Enter the amount of discount(in %)</label>
        //                                                                 <Field name={`offers.${index}.discount`} component={TextField} type="text" style={{ padding: '3px' }} required />
        //                                                                 <ErrorMessage name={`offers.${index}.discount`} />
        //                                                             </div>
        //                                                             <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        //                                                                 <label htmlFor={`offers.${index}.minAmt`}>Enter the min. order amount:</label>
        //                                                                 <Field name={`offers.${index}.minAmt`} component={TextField} type="text" style={{ padding: '3px' }} required />
        //                                                                 <ErrorMessage name={`offers.${index}.minAmt`} />
        //                                                             </div>
        //                                                         </React.Fragment>

        //                                                     <Button color="secondary" onClick={() => remove(index)}>Remove offer</Button>
        //                                                 </div>
        //                                             ))}
        //                                         </div>
        //                                         <div className="mt-3">
        //                                             <Button style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', marginBottom: '5px', fontSize: '15px' }} variant="contained" color="secondary" onClick={() => push({ offerCode: '',startDate: '',endDate: '',discount: '',minAmt:''})}>Add more offers</Button>
        //                                             <Button type="submit" variant="contained" color="primary" style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', margin: '5% 37%', fontSize: '15px' }}>Submit</Button>
        //                                         </div>
        //                                     </React.Fragment>
        //                                 )}

        //                             </FieldArray>

        //                         </Form>
        //                     </div>
        //                 )}
        //             </Formik> : null}
        //     </div>
        //     </div>
        //     <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        //         <Alert severity="success" className="home-snackbar" variant="filled" >
        //             Uploaded Successfully
        //   </Alert>
        //     </Snackbar>
        // </Paper>
    )
}
