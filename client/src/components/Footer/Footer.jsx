import React from 'react';
import './Footer.scss'
import { Link } from 'react-router-dom'

import { footer } from '../../site_config';
// Footer Configuration.

const Footer = (props) => {
    return (
        <div className="footer-main">
            <div className="container-fluid mx-auto">
                <div className="row">
                    <div className="col-md-2">
                        <div className="foot">
                            About
                        </div>
                        <Link to="/" className="foot_link">Contact Us</Link>
                        <Link to="/" className="foot_link">About Us</Link>
                        <Link to="/" className="foot_link">Careers</Link>
                        <Link to="/" className="foot_link">Laladukaan Stories</Link>
                        <Link to="/" className="foot_link">News</Link>
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Help
                        </div>
                        <Link to="/" className="foot_link">Payments</Link>
                        <Link to="/" className="foot_link">Shippings</Link>
                        <Link to="/" className="foot_link">Cancellation & Returns</Link>
                        <Link to="/" className="foot_link">FAQ</Link>
                        <Link to="/" className="foot_link">Returns</Link>
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Policy
                        </div>
                        <Link to="/" className="foot_link">Retun Policies</Link>
                        <Link to="/" className="foot_link">Terms of use</Link>
                        <Link to="/" className="foot_link">Security</Link>
                        <Link to="/" className="foot_link">Privacy</Link>
                        <Link to="/" className="foot_link">Sitemap</Link>
                    </div>
                    <div className="col-md-2" style={{ borderRight: '1px solid grey' }}>
                        <div className="foot">
                            Social
                        </div>
                        <Link to="/" className="foot_link">Facebook</Link>
                        <Link to="/" className="foot_link">Twitter</Link>
                        <Link to="/" className="foot_link">Youtube</Link>
                        <Link to="/" className="foot_link">Instagram</Link>
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Mail us
                             </div>
                        <p className="foot_p">Laladukaan Private Limmited Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, <br /> Karnataka, India<br /> Email: <span>support.laladukaan@gmail.com</span></p>
                    </div>
                    <div className="col-md-2">
                        <div className="foot">
                            Registered Office address:
                             </div>
                        <p className="foot_p">Laladukaan Internet Private Limited,Buildings Alyssa, Begonia & Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103 <br /> Telephone: <span>1800 208 9898</span></p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="copyrights">
                        &copy; 2020. all rights reserved
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;