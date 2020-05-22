import React from 'react';
import './Profile.css';

export default function ProfileList(props) {
    return (
        <li className="list_box">
                                         <div className="a_pad">
                                             <form className="form_security" action="" method="">
                                                 <div style={{position:'relative'}}>
                                                     <div style={{paddingRight:'70px',position: 'relative'}}>
                                                         <div className="fixed_box">
                                                             <div style={{width:'100%'}}>
                                                                 <span style={{fontWeight: 'bold'}}>{props.property}</span>
                                                             </div>
                                                             <div style={{width:'100%'}} className="mar">
                                                                 {props.value}
                                                             </div>
                                                         </div>
                                                         <div className="edit_btn">
                                                            <div style={{width:'100%'}}>
                                                                <span className="btn_span">
                                                                   <span className="qwert">
                                                                       <input type='submit'/>
                                                                       <span className="asd">
                                                                           Edit
                                                                       </span>
                                                                   </span>
                                                                </span>
                                                            </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </form>
                                         </div>
                                     </li>
    )
}
