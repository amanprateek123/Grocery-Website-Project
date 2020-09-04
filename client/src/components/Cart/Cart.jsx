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

    const trimming = (string) => {
        const length = 35
        var trimmedString = string.length > length ?
            string.substring(0, length) + "..." :
            string;
        return trimmedString
    }
    return (
        <ul className="checkout">
            <li>
                <div className="list_cart">
                    <ul style={{ maxWidth: '700px' }}>
                        {props.cart.map((product, i) => {
                            if (!product.sku) return null;
                            return <li key={i} style={{ backgroundColor: product.sku.stockQuantity !== 0 ? '#fff' : '#f003', marginBottom: '1.5%', height: '80px' }}>
                                <div className="container-fluid item-wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'row', padding: '0' }}>
                                    <div className="col-md-2" style={{ height: '80px' }} >
                                        <div style={{ margin: '4px', marginLeft: '-10px', border: '1px solid #f3f3f3', height: '72px', width: '72px', overflow: 'hidden' }}>
                                            {product.sku.images[0] ? <div className="cartimg" style={{ width: "100%", height: '70px',padding:'2px',backgroundImage:`url(${product.sku.images[0].src})` }} ></div> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row" style={{ marginTop: '-5px' }}>
                                            <div style={{width:'100%'}}>
                                                <div className="brand col-md-12">
                                                    <p><u>{product.sku.product.brand}</u></p>
                                                </div>
                                                <Link to={`/product/${product.sku.product.id}?skuId=${product.sku.id}`} style={{ textDecoration: 'none' }}>
                                                    <div className="product_name col-md-12">
                                                        <p className="sku_cart p">{trimming(product.sku.product.name)}</p>
                                                        {product.sku.product.name.length > 35 ? <span>
                                                            <p className="tooltips">{product.sku.product.name}</p>  </span> : null}
                                                    </div>
                                                </Link>
                                                {product.sku.stockQuantity !== 0 ? null : <div className="stock">Out Of Stock</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row" style={{ marginTop: '3%' }}>
                                            <div className='col-md-6'>
                                                <div className="add_rem">
                                                    <button className="remove" onClick={() => props.removeFromCart(product.skuId)} disabled={product.quantity === 1 ? true : false}>-</button>
                                                    <div style={{ display: 'inline-block', padding: '0.5em' }}>{product.quantity}</div>
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