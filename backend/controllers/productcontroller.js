const productModel = require('../models/productmodel')
//get products api -api/v1/products

exports.getproducts=async(req,res,next)=>{
 const query=  req.query.keyword?{name:{ 
      $regex:req.query.keyword,
      $options:'i'
   }}:{}
const products = await productModel.find(query)


   res.json({
        sucess: true,
   products
})}
//get products api -api/v1/products/:id

exports.getsingleproducts= async (req,res,next)=>{
   console.log(req.params.id)
   try {
      const product = await productModel.findById(req.params.id)
      res.json({
         sucess: true,
         product
 })
   } catch (error) {
      res.status(404).json({
         sucess: false,
         message: 'unable to get product id'
 })
   }
}