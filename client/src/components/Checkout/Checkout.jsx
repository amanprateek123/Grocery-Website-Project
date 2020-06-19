import React from 'react'
import './Checkout.scss'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

export default function Checkout(props) {
    return (
       <ul className="checkout">
            <li>
                <div className="list_cart">
                    <ul style={{maxWidth:'700px'}}>
                        {props.cart.map((product,i)=>{
                            return <li key={i} style={{backgroundColor:'#fff',marginBottom:'1.5%'}}>
                                <div className="container-fluid item-wrap" style={{position:'relative',display:'flex',flexDirection:'row'}}>
                                       <div className="col-md-2 ">
                                             <div className="row">
                                                  <img src={product.img} /> 
                                             </div>
                                       </div>
                                       <div className="col-md-5">
                                               <div className="row">
                                                   <div className="brand col-12">
                                                      <p>{product.title} </p> 
                                                   </div>
                                                   <div className="product_name col-12">
                                                      <p> {product.name} </p>
                                                   </div>
                                               </div>                                               
                                       </div>
                                       <div className="col-md-5">
                                              <div className="row" style={{marginTop:'10%'}}>
                                                  <div className='col-md-6'>
                                                    <div className="add_rem">
                                                         <button className="remove" onClick={()=>props.remove(product.id)} disabled={product.quantity===1?true:false}>-</button>
                                                         <input type="text" value={product.quantity} readOnly="readonly"/>
                                                         <button className="add" onClick={()=>props.add(product.id)}>+</button>
                                                    </div>
                                                  </div>
                                                  <div style={{marginLeft:'-10px',marginTop:'6px',width:'40%'}}>
                                                        <div className="cart_price">
                                                            Rs. <span>{product.price*(product.quantity)} </span>

                                                        </div>
                                                  </div>
                                                  <div style={{width:'5%'}}>
                                                     <DeleteIcon style={{marginTop:'7.5px',marginLeft:'0',color:'#E35F21',cursor:'pointer',fontSize:'20px'}} onClick={()=>props.delete(product.id)}/>
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
                    <p> Total : <span>Rs. {props.total}</span></p>
                       <Button color="inherit" style={{backgroundColor:'#E35F21',color:'white',width:'100%',height:'40px',fontSize:'15px'}}>
                        Proceed To Checkout
                        </Button>
                    </div>
                </div>
            </li>
       </ul>
    )
}
