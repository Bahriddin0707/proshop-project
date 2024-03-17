import express from "express";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getSingleProduct)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

export default router;
