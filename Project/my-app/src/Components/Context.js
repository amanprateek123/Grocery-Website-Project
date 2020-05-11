import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state ={
        products: [],
        detailProduct: detailProduct,
        cart:[]
    }
    componentDidMount(){
        this.setProducts();
    }

    setProducts = () =>{
        let product = [];
        storeProducts.forEach(item =>{
            const singleItem = item;
            product = [...product,singleItem]
        })
        this.setState(()=>{
            return {products:product}
        })
    }
  
    getItem = (id) =>{
        const product = this.state.products.find(item => item.id===id)
        return product;
    }

    handelDetail= (id)=>{
      const product = this.getItem(id);
      this.setState(() =>{
         return {detailProduct:product}
      })
    }
    addToCart = (id)=>{
        const temp_product = [...this.state.products];
        const index = temp_product.indexOf(this.getItem(id));
        const product = temp_product[index];
        product.inCart = true
        product.count=1;
        const price = product.price;
        product.total = price
        this.setState(()=>{
            return {products: temp_product, cart:[...this.state.cart,product]};

        },()=>{
            console.log(this.state)
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{...this.state, handelDetail:this.handelDetail,addToCart:this.addToCart}}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;
export  {ProductProvider,ProductConsumer};