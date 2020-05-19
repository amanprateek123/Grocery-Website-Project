import React, { Component } from 'react'
import {ProductConsumer} from '../Context';
import {NavLink} from 'react-router-dom';
import './Detail.css';

export default class Details extends Component {
    render() {
        return (
           <ProductConsumer>
               {(value) =>{
                   const {id,company,img,info,price,title,inCart} = value.detailProduct;
                   return(
                       <React.Fragment>
                       <div className="product container">
                          <div className="cata">
                              <div className="fade">
                                 <div className="fade1">
                                     <span className="f">Category</span>
                                 </div>
                                 <NavLink to="/" className="cata1">Beauty & Hygine</NavLink>
                                 <NavLink to="/" className="cata2">Adult Diapers</NavLink>
                                 <NavLink to="/" className="cata3">Antiseptics and Bandages</NavLink>
                                 <NavLink to="/" className="cata2">Ayurveda</NavLink>
                                 <NavLink to="/" className="cata2">Cotton & Earbuds</NavLink>
                                 <NavLink to="/" className="cata2">Slimming Products</NavLink>
                                 <NavLink to="/" className="cata2">Sexual Wellness</NavLink>
                                 <NavLink to="/" className="cata2">Supplements & Proteins</NavLink>
                              </div>
                            
                              <div className="fade">
                                 <div className="fade1">
                                     <span className="f">Brand</span>
                                 </div>
                                 <NavLink to="/" className="cata2">Dettol</NavLink>
                                 <NavLink to="/" className="cata2">Dettol Antiseptics & Bandages</NavLink>
                              </div>                             
                          </div>
                          <div className="zoom">
                             <div className="z_pic">
                             <img className="imgd" src="https://www.bigbasket.com/media/uploads/p/l/40124254_7-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="Dettol" />
                             </div>
                             <div className="display">
                                <div className="d">
                                    <div className="d1">
                                    <img className="imgd1" src="https://www.bigbasket.com/media/uploads/p/s/40124254_7-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="pic"/>
                                    </div>
                                    <div className="d2">
                                    <img class="imgd2 " src="https://www.bigbasket.com/media/uploads/p/s/40124254-2_7-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="pic"/>
                                    </div>
                                    <div className="d2">
                                    <img class="imgd2 " src="https://www.bigbasket.com/media/uploads/p/s/40124254-3_5-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="pic"/>
                                    </div>
                                    <div className="d2">
                                    <img class="imgd2 " src="https://www.bigbasket.com/media/uploads/p/s/40124254-4_5-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="pic"/>
                                    </div>
                                    <div className="d2">
                                    <img class="imgd2 " src="https://www.bigbasket.com/media/uploads/p/s/40124254-8_5-dettol-antiseptic-disinfectant-liquid-for-first-aid-surface-cleaning-personal-hygiene.jpg" alt="pic"/>
                                    </div>                                                                       
                                </div>
                             </div>
                          </div>
                          <div className="cart1">
                           <div className="cname">
                              <NavLink to="/" className="q1">
                                   Dettol
                              </NavLink>
                              <h1 className="q2">
                              Dettol Antiseptic Disinfectant Liquid - For First Aid, Surface Cleaning, & Personal Hygiene, 1 L
                              </h1>
                              <div className="q3">
                                <div className="q31">
                                      <table className="table1">
                                          <tr className="t2">
                                              <td>MRP:</td>
                                              <td>273.90</td>
                                          </tr>
                                          <tr>
                                              <td></td>
                                              <td>(Inclusive of all taxes)</td>
                                          </tr>
                                      </table>
                                </div>
                              </div>
                           </div>
                           <div className="addToBasket">
                             <input aria-label="basketQtyInput" type="text" name="qty" maxlength="5" className="inp" value="1"/>
                             <div className="basket">
                                    <span>ADD TO BASKET</span>
                             </div>
                             <div className="save">
                                 <div className="s1">
                                      <span>SAVE</span>
                                 </div>
                             </div>
                           </div>
                           <section className="delivery">
                             <div style={{height:'20px'}}></div>
                             <div style={{height:'20px'}}>
                                 <div className="del">
                                     <span className="truck"> <i className="fa fa-truck" aria-hidden="true"/></span>
                                  Standard:  Tomorrow 8:00AM - 10:00AM
                                 </div>
                             </div>
                           </section>
                           <section className="pack1">
                              <div className="pack2">
                                  <span>Pack Sizes</span>
                              </div>
                              <div className="list1">
                                    <div className="list2">
                                        <div className="list21">
                                           1L
                                        </div>
                                        <div className="list212"></div>
                                        <div className="list3">
                                       <span style={{color:"#222"}}>Rs 273.90</span>
                                        </div>
                                        <div className="check">
                                            <span><i className="fa fa-check" aria-hidden="true"/></span>
                                        </div>
                                    </div>
                                    
                              </div>
                              <div className="list1">
                                    <div className="list7">
                                        <div className="list21">
                                           500ml
                                        </div>
                                        <div className="list212"></div>
                                        <div className="list3">
                                       <span style={{color:"#222"}}>Rs 273.90</span>
                                        </div>
                                        <div className="check">
                                            <span><i className="fa fa-check" aria-hidden="true"/></span>
                                        </div>
                                    </div>
                                    
                              </div>
                              <div className="list1">
                                    <div className="list7">
                                        <div className="list21">
                                           250ml
                                        </div>
                                        <div className="list212"></div>
                                        <div className="list3">
                                       <span style={{color:"#222"}}>Rs 173.90</span>
                                        </div>
                                        <div className="check">
                                            <span><i className="fa fa-check" aria-hidden="true"/></span>
                                        </div>
                                    </div>
                                    
                              </div>
                              <div className="list1">
                                    <div className="list7">
                                        <div className="list21">
                                           100ml
                                        </div>
                                        <div className="list212"></div>
                                        <div className="list3">
                                       <span style={{color:"#222"}}>Rs 53.50</span>
                                        </div>
                                        <div className="check">
                                            <span><i className="fa fa-check" aria-hidden="true"/></span>
                                        </div>
                                    </div>
                                    
                              </div>
                              
                           </section>
                          </div>
                       </div>
                       <section className="info container">
                            <h2 className="infoh2">
                            Dettol Antiseptic Disinfectant Liquid - For First Aid, Surface Cleaning, & Personal Hygiene
                            </h2>
                            <div>
                                <div className="abouts">
                                    <div className="abo1">
                                        <span>About the Product</span>
                                    </div>
                                    <div>
                                        <div className="abo2">
                                            <p className="abop">
                                            A house is not a home without a bottle of iconic Dettol Antiseptic Liquid.
                                             This versatile and trusted Dettol product provides all-round family protection 
                                             against germs and has been recommended by medical professionals for generations. 
                                            Use Dettol Antiseptic Disinfectant Liquid to kill germs on the skin, help protect
                                             against infection from cuts, scratches and it can also be used as a household disinfectant
                                              on surfaces or in the laundry. It provides expert protection against harmful bacteria 
                                              with a unique sanitizing formula and takes care of you and your family from harmful germs.
                                               It is also known to be safe for use on skin.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="abouts">
                                    <div className="abo1">
                                        <span>Composition</span>
                                    </div>
                                    <div>
                                        <ul className="abo2">
                                            <li className="abop">
                                            Dettol's antiseptic liquid contains a variety of mild chemicals that help in clearing any infecting
                                             bacteria that may have been transferred to the surface of the skin during an injury.
                                            </li>
                                            <li className="abop">
                                            It contains Chloroxylenol, Isopropyl Alcohol, Pine Oil, Castor Oil as well as Composition like
                                             caramel and water to dilute the solution.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="abouts">
                                    <div className="abo1">
                                        <span>How to Use</span>
                                    </div>
                                    <div>
                                    <ul className="abo2">
                                            <p className="abop1">Use as directed:</p>
                                            <li className="abop">
                                            First Aid: 1 tablespoon to 250 ml of water (1 in 20).
                                            </li>
                                            <li className="abop">
                                            Bathing: 1 teaspoon to a bucket of water.
                                            </li>
                                            <li className="abop">
                                            Nappy Wash: 1 tablespoon to 500 ml of water (1 in 40)
                                            </li>
                                            <li className="abop">
                                            Shaving: 2 teaspoons to a mug of shaving water (1 in 20).
                                            </li>
                                            <li className="abop">
                                            Surgical, Medical, Midwifery: See literature available to doctors and nurses on request
                                            </li>
                                            <li className="abop">
                                            Epidemics: Treat linen, floors and for spraying rooms, 1 tablespoon to 500 ml of water (1 in 40)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                       </section>
                       <div className="moreinfo container">
                        <div className="more1">
                            More Information
                        </div>
                        <div className="more2">
                            <div style={{padding: '1rem 1rem .2rem'}}>
                                Health & Medicine
                            </div>
                            <div>
                            <NavLink to="/" className="more3">Adult Diapers</NavLink> |
                            <NavLink to="/" className="more3">Antiseptics & Bandages</NavLink>|
                            <NavLink to="/" className="more3">Ayurveda</NavLink>|
                            <NavLink to="/" className="more3">Cotton & Ear Buds</NavLink>|
                            <NavLink to="/" className="more3">Everyday Medicine</NavLink>|
                            <NavLink to="/" className="more3">Sexual Wellness</NavLink>|
                            <NavLink to="/" className="more3">Slimming Products</NavLink>|
                            <NavLink to="/" className="more3">Supplements & Proteins</NavLink>
                            </div>
                        </div>
                        <div className="more2">
                            <div style={{padding: '1rem 1rem .2rem'}}>
                                Brands
                            </div>
                            <div>
                            <NavLink to="/" className="more3">Dettol</NavLink> |
                            <NavLink to="/" className="more3">Dettol Antiseptics & Bandages</NavLink>|                            
                            </div>
                        </div>
                        <div className="more2">
                            <div style={{padding: '1rem 1rem .2rem'}}>
                                Related Searchs
                            </div>
                            <div>
                            <NavLink to="/" className="more3">massage oil</NavLink> |
                            <NavLink to="/" className="more3">face packs</NavLink>                            
                            </div>
                        </div>
                        
                       </div>
                       </React.Fragment>
                   );
               }}                      
           </ProductConsumer>
                   )  
    }
}
