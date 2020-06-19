import React,{useState} from 'react'
import Check from '../../components/Checkout/Checkout'

export default function Checkout() {
 
   const cartProduct = [
       {
           id:1,
           img:"https://www.bigbasket.com/media/uploads/p/s/126906_6-aashirvaad-atta-whole-wheat.jpg",
           title:'Aashirvaad',
           name:"Atta - Whole Wheat",
           price:360,
           quantity:1
       },
       {
        id:2,
        img:"https://www.bigbasket.com/media/uploads/p/s/1209470_2-pepsi-soft-drink.jpg",
        title:'Pepsi',
        name:"Pepsi Soft Drink 2.25 L",
        price:90,
        quantity:1
    },
    {
        id:3,
        img:"https://www.bigbasket.com/media/uploads/p/s/40025355_6-fresho-whole-wheat-bread-safe-preservative-free.jpg",
        title:'Bread',
        name:"Whole Wheat Bread - Safe, Preservative Free",
        price:39,
        quantity:1
    },
    {
        id:4,
        img:"https://www.bigbasket.com/media/uploads/p/s/283426_2-india-gate-basmati-rice-feast-rozzana.jpg",
        title:'Basmati',
        name:"Basmati Rice - Feast Rozzana",
        price:424,
        quantity:1
    }
   ]


   
   const [cart, setCart] = useState(cartProduct)
   const deleted = (id)=>{
       let updatedCart = cart.filter(itm=>itm.id!==id)
       setCart(updatedCart)
   }
   const add = (id) =>{
    let updateCart= cart.map(item => {
       if (item.id === id ) {
         item.quantity++;
      }
      return item;
   })
   setCart(updateCart) 
 }  


const sub = (id)=> {
 let updateCart= cart.map(item => {
     if (item.id === id ) {
         item.quantity--;
      }
     return item;
   }    )
   setCart(updateCart) 
 } 
 let total = 0
 cart.forEach(itm=>{
     total+=itm.quantity*(itm.price)
 })
 


    return (
        <div>
           {cart.length>0?(
               <Check cart={cart} add={add} remove={sub} delete = {deleted} total={total}/>
           ):
           (<div style={{width:'500px',float:'right',backgroundColor:'#f3f3f3',height:'100px',textAlign:'center',position:'fixed',top:'5.8%',left:'50.6%',zIndex:'20'}}>
               <h1 style={{paddingTop:'4%',color:'#E35F21'}}>Cart is Empty</h1>
            </div>)} 
        </div>
    )
}
