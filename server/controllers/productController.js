import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc        Get all products
// @route       GET /api/products
// @access      Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc        Create Product
// @route       POST /api/products
// @access      Private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Name",
    image: "/images/sample.jpg",
    brand: "Brand Name",
    category: "Category Name",
    description: "Description",
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc        Get single product by id
// @route       GET /api/products/:id
// @access      Public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404).json({ message: "Resource not found" });
});

// @desc        Update product
// @route       PUT /api/products/:id
// @access      Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc        Delete product
// @route       DELETE /api/products/:id
// @access      Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  console.log(productId);
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @desc        Create a new review
// @route       POST /api/products/:id/reviews
// @access      Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => {
      return review.user.toString() === req.user._id.toString();
    });

    if (alreadyReviewed) {
      throw new Error("This product already reviewed");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length;
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
