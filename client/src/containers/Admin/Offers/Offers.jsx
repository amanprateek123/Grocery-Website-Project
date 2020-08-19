import React from 'react'
import { Paper, Button, Select, MenuItem, FormHelperText } from '@material-ui/core'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui'
import { useQuery, useMutation } from 'react-query';
import Snackbar from '@material-ui/core/Snackbar';
import './Offers.scss'
import { Alert } from '@material-ui/lab'

export default function Offers() {

    const [initial, setInitial] = useState(null)

    const convert = (data) => {
        let a = []
        data.map(i => {
            a.push({offerCode:i.offerCode,startDate:i.startDate,endDate:i.endDate,discount:i.discount,minAmt:i.minAmt})
        })
        if (a.length === 0) {
            setInitial({
                offers: [
                    {
                        offerCode: '',
                        startDate: '',
                        endDate: '',
                        discount: '',
                        minAmt:''
                    }
                ]
            })
        }
        else {
            setInitial({
                offers: a
            })
        }
        console.log('a', a)
    }

    
    useEffect(() => {
        fetch('/admin/offers', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json()).then(res => {
            console.log('res',res)
            convert(res)
        })
    }, [])

    const [snackbar, setSnackbar] = useState(false)

    const offerAdd = (variable) => {
        console.log(variable.variables.offers)
        return (
            fetch('/admin/offers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(variable.variables.offers)
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

    return (
        <Paper className="offers">
            <h1>Genric Offers</h1>
            <div className="offer_head">
                <p>Add Offers for your customer :</p>
                <div>
                    {initial ? <Formik
                        initialValues={initial}
                        onSubmit={async (values, { setSubmitting }) => {
                            await off({variables:values})
                            console.log(values)
                        }}
                    >
                        {({ values }) => (
                            <div>
                                <Form className="home_form" style={{ fontSize: "17px", marginTop: '2%' }}>
                                    <FieldArray name="offers">
                                        {({ insert, remove, push }) => (
                                            <React.Fragment >
                                                <div>
                                                    {values.offers.map((offer, index) => (
                                                        <div key={index} style={{ margin: '1em 0', padding: '1em', background: '#eee7' }}>
                                                                <React.Fragment>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`offers.${index}.offerCode`}>Enter the Offer Code:</label>
                                                                        <Field name={`offers.${index}.offerCode`} component={TextField} type="text" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`offers.${index}.offerCode`} />
                                                                    </div>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`offers.${index}.startDate`}>Enter the Starting Date & Time:</label>
                                                                        <Field name={`offers.${index}.startDate`} value={format(offer.startDate)} component={TextField} type="datetime-local" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`offers.${index}.startDate`} />
                                                                    </div>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`offers.${index}.endDate`}>Enter the Ending Date & Time:</label>
                                                                        <Field name={`offers.${index}.endDate`} component={TextField} type="datetime-local" value={format(offer.endDate)}  style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`offers.${index}.endDate`} />
                                                                    </div>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`offers.${index}.discount`}>Enter the amount of discount(in %)</label>
                                                                        <Field name={`offers.${index}.discount`} component={TextField} type="text" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`offers.${index}.discount`} />
                                                                    </div>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`offers.${index}.minAmt`}>Enter the min. order amount:</label>
                                                                        <Field name={`offers.${index}.minAmt`} component={TextField} type="text" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`offers.${index}.minAmt`} />
                                                                    </div>
                                                                </React.Fragment>

                                                            <Button color="secondary" onClick={() => remove(index)}>Remove offer</Button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-3">
                                                    <Button style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', marginBottom: '5px', fontSize: '15px' }} variant="contained" color="secondary" onClick={() => push({ offerCode: '',startDate: '',endDate: '',discount: '',minAmt:''})}>Add more offers</Button>
                                                    <Button type="submit" variant="contained" color="primary" style={{ padding: '5px 4px', borderRadius: '200px', width: '180px', margin: '5% 37%', fontSize: '15px' }}>Submit</Button>
                                                </div>
                                            </React.Fragment>
                                        )}

                                    </FieldArray>

                                </Form>
                            </div>
                        )}
                    </Formik> : null}
            </div>
            </div>
            <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="success" className="home-snackbar" variant="filled" >
                    Uploaded Successfully
          </Alert>
            </Snackbar>
        </Paper>
    )
}
