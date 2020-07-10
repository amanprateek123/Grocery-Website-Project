import React, { useEffect } from 'react'
import './Cart.scss'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

function Cart(props) {
    let total = 0
    if (props.cart[0]) {
        props.cart.forEach(itm => {
            total += itm.sku ? itm.quantity * (itm.sku.price) : 0
        })
    }

    console.log(props.cart);

    return (
        <ul className="checkout">
            <li>
                <div className="list_cart">
                    <ul style={{ maxWidth: '700px' }}>
                        {props.cart.map((product, i) => {
                            if (!product.sku) return null;
                            return <li key={i} style={{ backgroundColor: '#fff', marginBottom: '1.5%' }}>
                                <div className="container-fluid item-wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
                                    <div className="col-md-2 ">
                                        <div style={{ width: '100%', marginLeft: '-10px' }}>
                                            {product.sku.images[0] ? <img src={product.sku.images[0].src} /> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row">
                                            <div className="brand col-12">
                                                <p><u>{product.sku.product.brand}</u></p>
                                            </div>
                                            <Link to={`/product/${product.sku.product.id}?skuId=${product.sku.id}`} style={{ textDecoration: 'none' }}>
                                                <div className="product_name col-12">
                                                    <p> {product.sku.product.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="row" style={{ marginTop: '10%' }}>
                                            <div className='col-md-6'>
                                                <div className="add_rem">
                                                    <button className="remove" onClick={() => props.removeFromCart(product.skuId)} disabled={product.quantity === 1 ? true : false}>-</button>
                                                    <input type="text" value={product.quantity} readOnly="readonly" />
                                                    <button className="add" onClick={() => props.addToCart(product.skuId)}>+</button>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: '-10px', marginTop: '6px', width: '40%' }}>
                                                <div className="cart_price">
                                                    Rs. <span>{product.sku.price * (product.quantity)} </span>

                                                </div>
                                            </div>
                                            <div style={{ width: '5%' }}>
                                                <DeleteIcon style={{ marginTop: '7.5px', marginLeft: '0', color: '#E35F21', cursor: 'pointer', fontSize: '20px' }} onClick={() => props.deleteFromCart(product.skuId)} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </li>
            <li>
                <div >
                    <div className="check_btn col-12">
                        <p>Sub Total : <span>Rs. {total}</span></p>
                        <NavLink to='/checkout' style={{ textDecoration: 'none' }}>
                            <Button color="inherit" style={{ backgroundColor: '#E35F21', color: 'white', width: '100%', height: '40px', fontSize: '15px' }}>
                                Proceed To Checkout
                          </Button>
                        </NavLink>
                    </div>
                </div>
            </li>
        </ul >
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
        fetchCart: () => dispatch(actions.fetchCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)