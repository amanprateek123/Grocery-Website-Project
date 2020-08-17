import React from 'react'
import './Facilities.scss'
import EuroSymbolOutlinedIcon from '@material-ui/icons/EuroSymbolOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined';
import AppleIcon from '@material-ui/icons/Apple';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';

export default function Facilities() {
    return (
        <div className="facility row" style={{margin:'0 auto'}}>
            <div className="col-2 individual">
                  <div className="fac_icon">
                      <EuroSymbolOutlinedIcon fontSize="inherit"/>
                  </div>
                  <div className="fac_list">
                      <h1>
                          Great Value
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
            <div className="col-2 individual">
                  <div className="fac_icon">
                        <LocalShippingOutlinedIcon fontSize="inherit"/>
                  </div>
                  <div className="fac_list">
                      <h1>
                          Worldwide Delivery
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
            <div className="col-2 individual">
                  <div className="fac_icon">
                       <CreditCardOutlinedIcon fontSize="inherit"/>
                  </div>
                  <div className="fac_list">
                      <h1>
                          Safe Payment
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
            <div className="col-2 individual">
                  <div className="fac_icon">
                      <PolicyOutlinedIcon fontSize="inherit"/>
                  </div>
                  <div className="fac_list">
                      <h1>
                          Shop with confidence
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
            <div className="col-2 individual">
                  <div className="fac_icon">
                      <GroupOutlinedIcon fontSize="inherit"/>
                  </div>
                  <div className="fac_list">
                      <h1>
                          24/7 help center
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
            <div className="col-2 individual">
                  <div className="fac_icon">
                      <AndroidOutlinedIcon fontSize="inherit"/><span><AppleIcon fontSize="inherit"/></span>
                  </div>
                  <div className="fac_list">
                      <h1>
                          Shop on the go
                      </h1>
                      <h6>
                          We offer competitive prices on our 100 million plus product range.
                      </h6>

                  </div>
            </div>
        </div>
    )
}
