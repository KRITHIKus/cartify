import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart({cartitems,setcartitems}){
    
const[complete,setcomplete]=useState(false);

    function increaseqty(item){
        if(item.product.stock==item.qty){
            return;
        }
             const updateditems= cartitems.map((i)=>{
                if(i.product._id==item.product._id)
                    {
              i.qty++
                    }
             return i;
                })
                setcartitems(updateditems)
        }
        function decreaseqty(item){
            if(item.qty >1){
                const updateditems= cartitems.map((i)=>{
                    if(i.product._id==item.product._id)
                        {
                  i.qty--
                        }
                 return i;
                    })
                    setcartitems(updateditems)
        }
            }
function removeitem(item){
    const updateditems= cartitems.filter((i)=>{
        if(i.product._id!==item.product._id)
            {
          return true;
            }

        })
        setcartitems(updateditems)
}

function placeorder(){
fetch(process.env.REACT_APP_API_URL+'/order',{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(cartitems)
    
})
.then(()=>{ 
    
    setcartitems([]); 
setcomplete(true);
toast.success("ORDER SUCCESS")
})
}



  return cartitems.length > 0 ? <Fragment>
  <div class="container container-fluid">
    <h2 class="mt-5">Your Cart: <b>{cartitems.length} items</b></h2>
    
    <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8">
            {cartitems.map((item)=>(
            <Fragment><hr />
            <div class="cart-item">
                <div class="row">
                    <div class="col-4 col-lg-3">
                        <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115"/>
                    </div>

                    <div class="col-5 col-lg-3">
                    <Link to={"/product/"+item.product._id}> {item.product.name}</Link>
                    </div>


                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div class="stockCounter d-inline">
                            <span class="btn btn-danger minus" onClick={()=>decreaseqty(item)}>-</span>
                            <input type="number" class="form-control count d-inline" value={item.qty} readOnly />

                            <span class="btn btn-primary plus" onClick={()=>increaseqty(item)}>+</span>
                        </div>
                    </div>

                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=>removeitem(item)}></i>
                    </div>

                </div>
            </div></Fragment>)
            )}
            
           
        </div>

        <div class="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span class="order-summary-values">{cartitems.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span></p>
                <p>Est. total: <span class="order-summary-values">${cartitems.reduce((acc,item)=>(acc+item.product.price*item.qty),0)}</span></p>

                <hr />
                <button id="checkout_btn" class="btn btn-primary btn-block" onClick={placeorder}>Place Order</button>
            </div>
        </div>
    </div>
</div></Fragment> :(!complete ? <h2 className='mt-5'>Add items to cart</h2> : 
<Fragment>
<h2 className='mt-5'>order is complete</h2>
<p>Your order as been placed successfully</p>
</Fragment>)
   
}