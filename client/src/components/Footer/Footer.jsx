import React from 'react';
import './Footer.scss'
import { Link } from 'react-router-dom'

import { footer } from '../../site_config';
// Footer Configuration.

const Footer = (props) => {
    return (
        <React.Fragment>
            <div className="footer-main">
            <div className="container-fluid mx-auto">
                <div className="row">
                    <div className="col-md-2">
                        <div className="foot">
                            About
                        </div>
                        {footer.about.map((itm,i) =>{
                           return <Link to="itm.link" key={itm+i}  className="foot_link">{itm.tag}</Link>
                        })}
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Help
                        </div>
                        {footer.help.map((itm,i) =>{
                           return <Link to="itm.link" key={itm+i} className="foot_link">{itm.tag}</Link>
                        })}
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Policy
                        </div>
                        {footer.policy.map((itm,i) =>{
                           return <Link to="itm.link" key={itm+i} className="foot_link">{itm.tag}</Link>
                        })}
                    </div>
                    <div className="col-md-2" style={{ borderRight: '1px solid grey' }}>
                        <div className="foot">
                            Social
                        </div>
                        {footer.social.map((itm,i) =>{
                           return <Link to="itm.link" key={itm+i} className="foot_link">{itm.tag}</Link>
                        })}
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Mail us
                             </div>
                        <p className="foot_p">{footer.address}<br /> Email: <span>{footer.email}</span></p>
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Registered Office address:
                             </div>
                        <p className="foot_p">{footer.address}, 560103 <br /> Telephone: <span>{footer.telephone}</span></p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="copyrights">
                        &copy; 2020. all rights reserved<br/>powered by <span style={{color:'var(--mainColor'}}>Lala-Logix!</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyrights foots">
                        &copy; 2020. all rights reserved, powered by <span style={{color:'var(--mainColor'}}>Lala-Logix!</span>
                    </div>
        </React.Fragment>
    );
}

export default Footer;