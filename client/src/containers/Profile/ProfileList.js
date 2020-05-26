import React from 'react';
import './Profile.scss';

export default function ProfileList(props) {
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
                                {!props.notInput ? <input disabled={!props.editing} onChange={props.onChange} type={props.type} className="field" value={props.value ?? ''} /> : null}
                            </div>
                        </div>
                        {props.editable ?
                            !props.editing ?
                                <button className="btn btn-link btn-sm position-absolute edit" onClick={props.toggleEdit}>{props.editable}</button>
                                :
                                <button className="btn btn-link text-success btn-sm position-absolute edit" onClick={props.toggleEdit}>Done</button>
                            : null
                        }
                    </div>
                </div>
            </div>
        </li>
    )
}
