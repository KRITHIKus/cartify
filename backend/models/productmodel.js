const mongoose=require('mongoose')




const productSchema=mongoose.Schema({
    name:String,
    price:String,
    description:String,
    ratings:String,
    images:[
        {
        image:String
        }
    ],
    category:String,
    seller:String,
    stock:String,
    numofReviews:String,
    createdAt: Date
});
const productModel=mongoose.model('Product',productSchema)
module.exports=productModel;