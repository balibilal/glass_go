import express from 'express';

import { addProducts, getProducts, patchRiders, updateProd } from '../controllers/products.controller.js';
import { isAuthorized, isAuthunticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/add-product', addProducts);
router.get('/get-products',  getProducts);
router.patch('/update/:id', updateProd);
router.patch('/riders/:id', patchRiders);



export default router;
