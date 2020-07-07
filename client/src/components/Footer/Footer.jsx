import React from 'react';
import './Footer.scss'

const Footer = (props) => {
    return (
        <div className="footer-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h4>LalaDukaan</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio veritatis incidunt amet saepe, animi officia dicta delectus aspernatur fuga recusandae reprehenderit dolorum atque nulla provident voluptates rerum, sed magnam aut voluptas quam. Tenetur ipsam facilis officiis quibusdam illo.
                    </p>
                    </div>
                    <div className="col-md-3">
                        <h4>Links</h4>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, reiciendis!
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h4>Contact</h4>
                        <p>
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="copyrights">
                        &copy; 2020. all rights reserved
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;