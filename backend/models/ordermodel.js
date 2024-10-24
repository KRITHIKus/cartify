const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,
    createdAt:Date

})
const ordermodel=mongoose.model('order',orderSchema)
module.exports=ordermodel