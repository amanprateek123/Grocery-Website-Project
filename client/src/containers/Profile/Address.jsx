import React from 'react';

const Address = (props) => {
    return (
        <li className="list_box">
            <div className="a_pad">
                <div style={{ position: 'relative' }}>
                    <div style={{ paddingRight: '70px', position: 'relative' }}>
                        <div className="fixed_box">
                            <div style={{ width: '100%' }}>
                                <span style={{ fontWeight: 'bold' }}>{props.property}</span>
                            </div>
                            <div style={{ width: '100%' }} className="mar">
                                <div>{props.value.address}</div>
                                <div>{props.value.city}, {props.value.state}</div>
                                <div>{props.value.country}, {props.value.zip}</div>
                                <div>{props.value.email} : {props.value.mobile}</div>
                            </div>
                        </div>
                        <div className="actions">
                            {/* <button className="btn btn-link btn-sm">Edit</button> */}
                            <button className="btn btn-link text-danger btn-sm" onClick={props.removeAddress}>Remove</button>
                        </div>

                    </div>
                </div>
            </div>
        </li>
    );
}

export default Address;