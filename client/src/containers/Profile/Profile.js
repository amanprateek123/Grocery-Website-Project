import React, { Component } from 'react'
import './Profile.css';
import ProfileList from './ProfileList';
import Button from './Button';

export default class Profile extends Component {
    render() {
        return (
            <div className="container">
                <div className="login_security">
                   <h1 className="login_header">
                       Login & Security
                   </h1>
                   <div className="a_sec">
                       <div className="security_box">
                             <div className="inner_box">
                                  <ul className="unorder_box">
                                     <ProfileList property="Name:" value="Aman"/>
                                     <ProfileList property="Email:" value="amanpra333@gmail.com"/>
                                     <ProfileList property="Mobile Number:" value="+919625341429"/>
                                     <ProfileList property="Password:" value="*********"/>
                                     <ProfileList property="Address:" value="House No.29 Jagritivihar Sec 23 SanjayNagar Ghaziabad"/>
                                  </ul>
                             </div>
                       </div>
                       <Button/>
                   </div>
                </div>
            </div>
        )
    }
}
