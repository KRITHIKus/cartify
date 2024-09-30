const express = require('express')
const { getproducts, getsingleproducts } = require('../controllers/productcontroller')
const router=express.Router()

router.route('/products').get(getproducts)
router.route('/products/:id').get(getsingleproducts)




module.exports = router