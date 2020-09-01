import React from 'react';
import { Paper, Button, Select, MenuItem, FormHelperText } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import '../Admin.scss'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui'
import './Homepage.scss'
import { useQuery, useMutation } from 'react-query';
import Snackbar from '@material-ui/core/Snackbar';

function Homepage(props) {

    const [initial, setInitial] = useState(null)

    const convert = (data) => {
        let a = []
        data.map(i => {
            a.push({ heading: i.heading, subHeading: i.subHeading, value: i.value, fieldType: i.fieldType })
        })
        if (a.length === 0) {
            setInitial({
                sections: [
                    {
                        heading: '',
                        subHeading: '',
                        value: '',
                        fieldType: ''
                    }
                ]
            })
        }
        else {
            setInitial({
                sections: a
            })
        }
        console.log('a', a)

    }

    useEffect(() => {
        fetch('/homepage', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json()).then(res => {
            convert(res)
        })
    }, [])
    const [data, setData] = useState(null)

    const homePage = (variable) => {
        console.log(variable.variables.sections)
        return (
            fetch('/admin/homepage', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(variable.variables.sections)
            }).then(res => res.json()).then(res => {
                console.log(res)
                setData(res)
                setSnackbar(true)
            })
        )
    }
    const [snackbar, setSnackbar] = useState(false)

    const [home, meta] = useMutation(homePage)

    return (
        <Paper className="home_edit">
            <h1>Homepage</h1>
            <div className="m-3">
                <p className="p-2" style={{ fontSize: '20px' }}>Add sections for the Homepage:</p>
                <div>
                    {initial ? <Formik
                        initialValues={initial}
                        onSubmit={async (values, { setSubmitting }) => await home({ variables: values })}
                    >
                        {({ values }) => (
                            <div>
                                <Form className="home_form" style={{ fontSize: "17px", marginTop: '4%' }}>
                                    <FieldArray name="sections">
                                        {({ insert, remove, push }) => (
                                            <React.Fragment>
                                                <div>
                                                    {values.sections.map((sec, index) => (
                                                        <div key={sec.id + index} style={{ margin: '1em 0', padding: '1em', background: '#eee7' }}>
                                                            <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                <label htmlFor={`sections.${index}.fieldType`}>Enter the Field Type:</label>
                                                                <Field name={`sections.${index}.fieldType`} as="select" className="offer_form" style={{ padding: '3px' }}>
                                                                    <option value="">Select Option</option>
                                                                    <option value="product">Product</option>
                                                                    <option value="banners">Banners</option>
                                                                    <option value="carousel">Carousel</option>
                                                                    <option value="special">Special Section</option>
                                                                    <option value="brands">Brand-banner</option>
                                                                </Field>
                                                                <ErrorMessage name="fieldType" />
                                                            </div>
                                                            {sec.fieldType === '' || sec.fieldType === 'special' ? null :
                                                                <React.Fragment>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`sections.${index}.heading`}>Enter the heading for the section:</label>
                                                                        <Field name={`sections.${index}.heading`} component={TextField} type="text" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`sections.${index}.heading`} />
                                                                    </div>
                                                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                        <label htmlFor={`sections.${index}.subHeading`}>Enter the sub-heading for the section:</label>
                                                                        <Field name={`sections.${index}.subHeading`} component={TextField} type="text" style={{ padding: '3px' }} required />
                                                                        <ErrorMessage name={`sections.${index}.subHeading`} />
                                                                    </div>
                                                                </React.Fragment>}
                                                            {sec.fieldType === '' ? null :
                                                                <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                                                    <label htmlFor={`sections.${index}.value`}>Enter the {(sec.fieldType === "product") ? "JSON Array(SKU's ID) for adding products" : ((sec.fieldType) === "banners" || sec.fieldType === "brands" || (sec.fieldType) === "carousel") ? "array of image links" : (sec.fieldType === "special") ? "array of 4 objects(includes Heading and Category Id) " : null}:</label>
                                                                    <Field name={`sections.${index}.value`} component={TextField} multiline type="text" style={{ padding: '3px' }} required />
                                                                    <ErrorMessage name={`sections.${index}.value`} />
                                                                </div>}

                                                            <Button color="secondary" onClick={() => remove(index)}>Remove</Button>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/*                      
                   {meta.isSuccess?<div style={{color:'green',textAlign:'center',fontSize:'15px'}}>Uploaded Successfully</div>:null} */}
                                                {meta.isError ? <div style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>Uploading Failed</div> : null}
                                                <div className="mt-3">
                                                    <Button className="admt" style={{ borderRadius: '200px', marginBottom: '5px', fontSize: '15px' }} variant="contained" color="secondary" onClick={() => push({ key: "", value: "", fieldType: "" })}>Add Section</Button>
                                                    <Button type="submit" className="sbmt" variant="contained" color="primary" style={{ borderRadius: '200px', fontSize: '15px' }}>Submit</Button>
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