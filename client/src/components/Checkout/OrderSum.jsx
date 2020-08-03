import React, { useState } from 'react'
import './OrderSum.scss'
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux'
import * as actions from '../../store/actions'


function OrderSum(props) {

    const Order = (
        <div className="order_det">
            <h3>
                <span className="span1">
                    2
            </span>
                <span className="span2">
                    Order Summary
            </span>
                <span className="span3">Delivery by Saturday Jun 27</span>
            </h3>
            <div style={{ backgroundColor: '#fff' }}>
                {props.cart.map((item, i) => {
                    return (
                        <div className="cart_lister">
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <div className="img_cont">
                                        <img src={item.sku.images[0].src} />
                                    </div>
                                </div>
                                <div className="pro_det">
                                    <div className="pro_name">
                                        <h4>
                                            {item.sku.product.name}
                                        </h4>
                                    </div>
                                    <div className="sku_name">
                                        {item.sku.name}
                                    </div>
                                    <div className="seller_prod">
                                        <span>Seller: Laladukaan</span>
                                    </div>
                                    <span className="order_price">
                                        ₹ {item.sku.price * (item.quantity)}
                                    </span>
                                    {item.sku.stockQuantity === 0 ? <div className="out-of-stock">Out of Stock</div> : null}
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="pro_manp">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <button className="red_itm" onClick={() => props.removeFromCart(item.skuId)} disabled={item.quantity === 1 ? true : false}>-</button>
                                        <div className="pro_quan">
                                            <input type="text" readOnly="readonly" value={item.quantity} />
                                        </div>
                                        <button className="red_itm" onClick={() => props.addToCart(item.skuId)}>+</button>
                                    </div>
                                </div>
                                <div className="delete_prod">
                                    <div className="rem_del" onClick={() => props.deleteFromCart(item.skuId)}>
                                        <span>Remove</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {(props.cart.length) > 0 ?
                    <div className="confirm">
                        <span>
                            Order confirmation email will be sent to <span><p>{props.user.email}</p></span>
                        </span>
                        <span>
                            <button className="cont_order" onClick={props.payment}>Payment Options</button>
                        </span>
                    </div> : null}
            </div>
            <div style={{ marginTop: '8px', marginBottom: '8px', backgroundColor: 'white' }}>
                <div className="order_sum">
                    <span className="span1" style={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }}>
                        3
                             </span>
                              PAYMENT OPTIONS
                          </div>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div className="deli_sum">
                    <div className="child_del">
                        <div>
                            <div className="del_tit">
                                Delivery address
                           <DoneIcon className="done_del" />
                            </div>
                        </div>
                        <div className="add_list">
                            <input type="radio" checked className="del_rad" />
                            <span className="del_name">
                                {props.address[props.idx].name}
                            </span>
                            <span className="span_plac">Home</span><span className="span_num">{props.address[props.idx].mobile}</span>
                            <br />
                            <span style={{ marginLeft: '3%' }}> {props.address[props.idx].address}</span>
                            <br />
                            <span style={{ marginLeft: '3%' }}> {props.address[props.idx].state}, <span> {props.address[props.idx].country} - <span>{props.address[props.idx].zip}</span></span></span>
                        </div>
                        <button className="del_chng" onClick={props.change}>Change</button>
                    </div>
                </div>
            </div>
            {Order}
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (SKUId) => dispatch(actions.addToCart(SKUId)),
        removeFromCart: (SKUId) => dispatch(actions.removeFromCart(SKUId)),
        deleteFromCart: (SKUId) => dispatch(actions.deleteFromCart(SKUId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSum);