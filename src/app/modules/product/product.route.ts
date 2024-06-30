import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/create-product', productController.createProduct);
router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getSingleProduct);
router.delete('/:productId', productController.getDeletedSingeProduct);
router.put('/:productId', productController.getUpdateSingleProduct);
router.get('/products?searchTerm', productController.getSearchProducts);

export const ProductRoutes = router;
