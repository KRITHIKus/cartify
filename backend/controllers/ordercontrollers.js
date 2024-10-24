const ordermodel=require('../models/ordermodel');
const productmodel=require('../models/productmodel')
exports.createorder= async(req,res,next)=>{
   // create order api -api/v1/order 
    const cartItems=req.body
    const status='pending'
    const amount=Number(cartItems.reduce((acc,item)=>(acc + item.product.price * item.qty),0)).toFixed(2)
     const order=await ordermodel.create({cartItems,amount,status})


     //UPDATING PRODUCT STOCK
     cartItems.forEach(async(item) => {
      const product=await  productmodel.findById(item.product._id);
        product.stock=product.stock- item.qty
        await product.save()
    
});


    res.json({
        success:true,
        order
    })
}